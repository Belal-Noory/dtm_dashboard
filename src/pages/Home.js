import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import Container from "react-bootstrap/Container";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      axios
        .get("https://afghanresponse.iom.int/DTMOD/api/Tools")
        .then((response) => {
          setData(response.data);
        });
    } catch (e) {
      console.log("Server Error : " + e.message);
    }
  }, []);

  return (
    <Container>
      <h2 style={{ fontWeight: "bold", fontVariant: "small-caps" }}>Hint!</h2>
      <p>
        Please seect the survey first which is dashboard you want to load and
        see all the related data.
      </p>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Survey Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{item._title}</td>
                  <td>
                    <Link to={`/dashboard/${item._table.split("_")[1]}`}>
                      <Button variant="outline-info">Dashboard</Button>
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};
export default Home;
