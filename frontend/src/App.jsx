import { useEffect, useState } from "react";
import "./App.css";
import { Card, Container } from "react-bootstrap";
import ImageList from "./ImageList";
import AddImage from "./AddImage";
import axios from "axios";

const API_URL = `http://localhost:5000/images`;

function App() {
  const [imagesState, setImagesState] = useState([]);

  const handleDeleteFunction = async (id) => {
    try {
      const deleteData = await axios.delete(`${API_URL}/${id}`);
      if (deleteData.status === 200) {
        alert(deleteData.data.message);
      }
      getData()
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const getResult = await axios.get(API_URL);
      if(getResult.status===200){
        setImagesState(getResult.data.data);
      }
     } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <>
      <Container className="mt-5">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card className="p-2 px-4">
            <AddImage getData={getData} />
          </Card>
        </div>
        {imagesState && imagesState.length > 0 ? (
          <ImageList
            imagesState={imagesState}
            handleDeleteFunction={handleDeleteFunction}
          />
        ) : (
          <p>No images found</p>
        )}
      </Container>
    </>
  );
}

export default App;
