import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const ImageList = ({ imagesState,handleDeleteFunction }) => {

    
  return (
    <>
      <Container className="mt-5">
        <Row>
          {imagesState.map((item,id) => (
            <Col xs={12} md={3} className="mb-5 mx-2" key={item.id}>
              <Card style={{ width: "18rem", }} >
                <Card.Img variant="top" src={item.images} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    {item.description}
                  </Card.Text>
                  <Button variant="danger" onClick={()=>handleDeleteFunction(item._id)}>Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ImageList;
