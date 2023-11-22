import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BarChart from "../components/BarChart";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "../components/DataTable";
import Box from "../components/Box";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function Dashboard() {
  const [errorLabels, setErrorLabels] = useState([]);
  const [errorData, setErrorData] = useState([]);
  const [errorTableData, setErrorTableData] = useState([]);
  const [errorLabelsOrg, setErrorLabelsOrg] = useState([]);
  const [errorDataOrg, setErrorDataOrg] = useState([]);
  const [errorTableDataOrg, setErrorTableDataOrg] = useState([]);
  const [vLabels, setVLabels] = useState([]);
  const [vData, setVData] = useState([]);
  const [vTableData, setVTableData] = useState([]);
  const [vLabelsOrg, setVLabelsOrg] = useState([]);
  const [vDataOrg, setVDataOrg] = useState([]);
  const [vTableDataOrg, setVTableDataOrg] = useState([]);
  const [errors, setErrors] = useState([]);
  const [valid, setValid] = useState([]);
  const [totalAss, setTotalAss] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const URL =
      "https://afghanresponse.iom.int/DTMOD/api/Tools/errors?id=" + id;
    try {
      axios.get(URL).then((response) => {
        setErrors(response.data);
      });
    } catch (e) {
      console.log("Server Error: " + e.message);
    }

    const URL2 =
      "https://afghanresponse.iom.int/DTMOD/api/Tools/valid?id=" + id;
    try {
      axios.get(URL2).then((response) => {
        setValid(response.data);
      });
    } catch (e) {
      console.log("Server Error: " + e.message);
    }
  }, []);

  useEffect(() => {
    const labels = [...new Set(errors.map((item) => item.DisplayName))];
    const labelsOrg = [
      ...new Set(
        errors.map((item) => {
          if (item.hasOwnProperty("enum_org")) {
            return item.enum_org;
          } else if (item.hasOwnProperty("organization")) {
            return item.organization;
          } else {
            return "IOM";
          }
        })
      ),
    ];
    const data = [];
    const dataOrg = [];
    const table = [];
    const tableOrg = [];
    labels.forEach((label) => {
      let total = errors.filter((item) => item.DisplayName === label).length;
      data.push(total);
      table.push({ name: label, total: total });
    });

    if (labelsOrg.length > 1) {
      labelsOrg.forEach((lbl) => {
        let total = errors.filter((item) => {
          if (item.hasOwnProperty("enum_org")) {
            return item.enum_org === lbl;
          } else if (item.hasOwnProperty("organization")) {
            return item.organization === lbl;
          }
        }).length;
        dataOrg.push(total);
        tableOrg.push({ name: lbl, total: total });
      });
    } else {
      dataOrg.push(errors.length);
      tableOrg.push({ name: "IOM", total: errors.length });
    }
    setErrorLabels(labels);
    setErrorData(data);
    setErrorTableData(table);
    setErrorLabelsOrg(labelsOrg);
    setErrorDataOrg(dataOrg);
    setErrorTableDataOrg(tableOrg);
    setTotalAss(totalAss + errors.length);
  }, [errors]);

  useEffect(() => {
    const labels = [...new Set(valid.map((item) => item.DisplayName))];
    const labelsOrg = [
      ...new Set(
        valid.map((item) => {
          if (item.hasOwnProperty("enum_org")) {
            return item.enum_org;
          } else if (item.hasOwnProperty("organization")) {
            return item.organization;
          } else {
            return "IOM";
          }
        })
      ),
    ];
    const data = [];
    const dataOrg = [];
    const table = [];
    const tableOrg = [];
    labels.forEach((label) => {
      let total = valid.filter((item) => item.DisplayName === label).length;
      data.push(total);
      table.push({ name: label, total: total });
    });

    if (labelsOrg.length > 1) {
      labelsOrg.forEach((lbl) => {
        let total = valid.filter((item) => {
          if (item.hasOwnProperty("enum_org")) {
            return item.enum_org === lbl;
          } else if (item.hasOwnProperty("organization")) {
            return item.organization === lbl;
          }
        }).length;
        dataOrg.push(total);
        tableOrg.push({ name: lbl, total: total });
      });
    } else {
      dataOrg.push(valid.length);
      tableOrg.push({ name: "IOM", total: valid.length });
    }
    setVLabels(labels);
    setVData(data);
    setVTableData(table);
    setVLabelsOrg(labelsOrg);
    setVDataOrg(dataOrg);
    setVTableDataOrg(tableOrg);
    setTotalAss(totalAss + valid.length);
  }, [valid]);

  return (
    <Container>
      <Row className="m-1">
        <Col lg={3}>
          <Box bg="info" title={"Total Assessment"} data={totalAss} />
        </Col>
        <Col lg={3}>
          <Box
            bg="primary"
            title={"Total Valid Assessment"}
            data={valid.length}
          />
        </Col>
        <Col lg={3}>
          <Box bg="danger" title={"Total Error"} data={errors.length} />
        </Col>
      </Row>
      <Tabs
        defaultActiveKey="byenum"
        id="uncontrolled-tab-example"
        className="mt-2"
      >
        <Tab eventKey="byenum" title="Errors Per Enumerator">
          {errorData && errorData.length ? (
            <Row>
              <Col lg={12}>
                <BarChart
                  ndata={errorData}
                  labels={errorLabels}
                  title="Errors Per Enumerator"
                  bgColor="rgba(54, 162, 235, 1)"
                />
              </Col>
              <Col lg={12}>
                <DataTable
                  data={errorTableData}
                  header={["Enumerator", "Total Error"]}
                />
              </Col>
            </Row>
          ) : (
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          )}
        </Tab>
        <Tab eventKey="edataorg" title="Errors Per Organization">
          {errorData && errorData.length ? (
            <Row>
              <Col lg={12}>
                <BarChart
                  ndata={errorDataOrg}
                  labels={errorLabelsOrg}
                  title="Errors Per Organization"
                  bgColor={"rgba(54, 162, 235, 1)"}
                />
              </Col>
              <Col lg={12}>
                <DataTable
                  data={errorTableDataOrg}
                  header={["Organization", "Total Error"]}
                />
              </Col>
            </Row>
          ) : (
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          )}
        </Tab>
        <Tab eventKey="vdataenum" title="Valid Per Enumerator">
          {errorData && errorData.length ? (
            <Row>
              <Col lg={12}>
                <BarChart
                  ndata={vData}
                  labels={vLabels}
                  title="Valid data Per Enumerator"
                  bgColor="rgba(54, 162, 235, 1)"
                />
              </Col>
              <Col lg={12}>
                <DataTable
                  data={vTableData}
                  header={["Organization", "Total"]}
                />
              </Col>
            </Row>
          ) : (
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          )}
        </Tab>
        <Tab eventKey="vdataorg" title="Valid Per Organization">
          {errorData && errorData.length ? (
            <Row>
              <Col lg={12}>
                <BarChart
                  ndata={vDataOrg}
                  labels={vLabelsOrg}
                  title="Valid data Per Organization"
                  bgColor="rgba(54, 162, 235, 1)"
                />
              </Col>
              <Col lg={12}>
                <DataTable
                  data={vTableDataOrg}
                  header={["Organization", "Total"]}
                />
              </Col>
            </Row>
          ) : (
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          )}
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Dashboard;
