import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import Mysnakebar from "./Mysanckbar";

export default function Post() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);

  const fetchPosts = () => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/posts/index")
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

 
  return (
    <>
      <Container maxWidth="sm">
        <input
          type="text"
          placeholder="Add Post"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
        <button
          value="Add Post"
          onClick={() => {
            axios
              .post("http://127.0.0.1:8000/api/posts/store", {
                title: input,
              })
              .then((response) => {
                setResponse(response.data.message);
                fetchPosts(); // إعادة تحميل البيانات → re-render تلقائي
              })
              .catch((err) => {
                setError(err.response?.data?.message || err.message);
              });
          }}
        >
          Add Post
        </button>
        <h1>Post</h1>
        <CardContent>
          {data.map((post) => {
            return (
              <Card sx={{ minWidth: 275 }} key={post.id}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {post.title}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {post.body}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            );
          })}
        </CardContent>
      </Container>
      <Mysnakebar response={response} error={error} />
    </>
  );
}
