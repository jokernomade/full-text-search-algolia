import {useEffect, useState} from 'react'
import { Container, Input, Form, FormGroup, Row, Col, Button } from "reactstrap"
import Results from "../Results"
import AddModal from "../AddModal"

const Search = () => {
  const [showModal,setShowModal] = useState(false)
  const [data,setData] = useState([])

  const toggle = async () => setShowModal(!showModal)

  const initAsync = async () => {

  }

  useEffect(()=>{
    initAsync()
    return () => {}
  },[])

  return (
    <Container md={10}>
      <Row>
        <AddModal isOpen={showModal} toggle={toggle} />
        <Col>
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
          <Button color="primary" style={{padding:10}} onClick={()=>toggle()} onSave={(obj)=>setData([...obj,...data])}>Adicionar</Button>
        </Col>
      </Row>
      <Results data={data} />
    </Container>
  )
}

export default Search