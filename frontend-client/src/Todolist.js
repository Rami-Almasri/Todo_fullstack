import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Collapse,
  Grow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

export default function Todolist() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputedit, setInputedit] = useState({ id: null, title: "" });
  const [deletingId, setDeletingId] = useState(null);

  const fetchTodos = () => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/todos/index")
      .then((res) => {
        setTodos(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = () => {
    if (!input) return;
    axios
      .post("http://127.0.0.1:8000/api/todos/store", { title: input })
      .then(() => {
        setInput("");
        fetchTodos();
      })
      .catch((err) => console.log(err));
  };

  const handleSave = (id) => {
    axios
      .post(`http://127.0.0.1:8000/api/todos/update/${id}`, {
        title: inputedit.title,
      })
      .then(() => {
        setInputedit({ id: null, title: "" });
        fetchTodos();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    setDeletingId(id); // يبدأ animation
    setTimeout(() => {
      axios
        .get(`http://127.0.0.1:8000/api/todos/destroy/${id}`)
        .then(() => fetchTodos())
        .catch((err) => console.log(err));
      setDeletingId(null);
    }, 300); // مدة الانيميشين قبل الحذف
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
      {/* Input Add */}
      <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add new todo"
          fullWidth
          size="small"
          sx={{ bgcolor: "#2e2e3f", borderRadius: 1, input: { color: "#fff" } }}
        />
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
      </Box>

      {/* قائمة Todos */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {todos.map((todo) => (
          <Grow
            key={todo.id}
            in={deletingId !== todo.id} // fade out عند الحذف
            style={{ transformOrigin: "top center" }}
          >
            <Card sx={{ bgcolor: "#2e2e3f", color: "#fff" }}>
              <CardContent>
                {inputedit.id !== todo.id && (
                  <Typography sx={{ fontSize: 18 }}>{todo.title}</Typography>
                )}

                {/* Edit Collapse */}
                <Collapse in={inputedit.id === todo.id}>
                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <TextField
                      value={inputedit.title}
                      onChange={(e) =>
                        setInputedit({ ...inputedit, title: e.target.value })
                      }
                      fullWidth
                      size="small"
                      sx={{
                        bgcolor: "#3a3a4f",
                        borderRadius: 1,
                        input: { color: "#fff" },
                      }}
                    />
                    <IconButton
                      color="primary"
                      onClick={() => handleSave(todo.id)}
                    >
                      <SaveIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => setInputedit({ id: null, title: "" })}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Box>
                </Collapse>
              </CardContent>

              {/* أزرار Edit/Delete */}
              {inputedit.id !== todo.id && (
                <CardActions>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      setInputedit({ id: todo.id, title: todo.title })
                    }
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(todo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              )}
            </Card>
          </Grow>
        ))}
      </Box>
    </Box>
  );
}
