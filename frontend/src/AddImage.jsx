import axios from "axios";
import { useState, useRef } from "react";
import { Button, Col, Form } from "react-bootstrap";

const API_URL = `http://localhost:5000/uploads`;

const AddImage = ({getData}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const imageInputRef = useRef(null);

  const handleSubmitFunction = async (event) => {
    event.preventDefault()
    if (!title) {
        alert("Title is required");
        return;
      }
      if (!description) {
        alert("Description is required");
        return;
      }
      if (!image) {
        alert("Please upload image");
        return;
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("images", image);
      try {
        const response = await axios.post(
         API_URL,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
        if (response.status === 200) {
            getData()
          alert("Image uploaded successfully");
        }
      } catch (error) {
        console.log(error);
        alert(error.response.data.error);
      } finally {
        setTitle("");
        setDescription("");
        setImage("");
        if (imageInputRef.current) {
          imageInputRef.current.value = "";
        }
      }
    };
  return (
    <>
      <Col xs={12} md={4} className="mb-5 w-100">
        <Form onSubmit={handleSubmitFunction}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              ref={imageInputRef}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </>
  );
};

export default AddImage;
