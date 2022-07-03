import { Input, Form, FormGroup, Row, Col, Button } from "reactstrap"

const Search = () => {
  return (
    <Row>
      <Col md={10}>
        <Form>
          <FormGroup>
            <Input
              style={{borderColor:'#000',borderWidth:1,borderRadius:5,padding:10}}
              id="text"
              name="text"
              placeholder="Procurar"
              plaintext
            />
          </FormGroup>
        </Form>
      </Col>
      <Col md={2}>
        <Button color="primary" style={{padding:10}}>Adicionar</Button>
      </Col>
    </Row>
  )
}

export default Search