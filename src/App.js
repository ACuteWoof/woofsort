import "antd/dist/antd.dark.min.css";

import { Button, Col, Collapse, Input, Row, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";

function process(text, discrim) {
  const lines = text.split("\n");
  const data = lines.map((line) => {
    const [name, ...data] = line.split(discrim);
    return { name, data: data };
  });

  const namedData = [];
  data.forEach((item) => {
    const { name, data } = item;
    if (namedData[name]) {
      namedData[name] = {
        name,
        data: [...namedData[name].data, ...data],
      };
    } else {
      namedData[name] = item;
    }
  });

  return namedData;
}

function App() {
  const [text, setText] = useState("");
  const [discrim, setDiscrim] = useState("");
  const [data, setData] = useState("");

  return (
    <>
      <Row>
        <Col
          span={18}
          push={6}
          style={{
            padding: "20px",
          }}
        >
          <Typography.Title>Processed Data</Typography.Title>
          <Collapse>
            {data &&
              Object.keys(data).map((key) => {
                return (
                  <Collapse.Panel header={key} key={key}>
                    <TextArea
                      value={data[key].data.join("\n")}
                      rows={10}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Collapse.Panel>
                );
              })}
          </Collapse>
        </Col>
        <Col
          span={6}
          pull={18}
          style={{
            padding: "20px",
          }}
        >
          <Typography.Title>Input Data</Typography.Title>
          <TextArea
            rows={4}
            placeholder="Text"
            style={{ marginBottom: "10px" }}
            onChange={(e) => setText(e.target.value)}
          />
          <Input
            placeholder="Discriminator"
            style={{ marginBottom: "10px" }}
            onChange={(e) => setDiscrim(e.target.value)}
          />
          <Button
            type="primary"
            onClick={() => {
              setData(process(text, discrim));
            }}
          >
            Process
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default App;
