import {useEffect, useState} from 'react'
import { Container, Input, Form, FormGroup, Row, Col, Button } from "reactstrap"
import AddModal from "../AddModal"
import Algolia from '../Algolia'
import Results from '../Results'

const Search = () => {
  const [showModal,setShowModal] = useState(false)
  const [data,setData] = useState([])
  const [query,setQuery] = useState('')

  const toggle = async () => setShowModal(!showModal)

  const initAsync = async () => {
    const results = await Algolia.search('')
    setData(results)
  }

  const runQuery = async (q) => {
    setQuery(q)
    const results = await Algolia.search(q)
    setData(results)
  }

  useEffect(()=>{
    initAsync()
    return () => {}
  },[])

  return (
    <Container md={10}>
      <Row>
        <AddModal isOpen={showModal} toggle={toggle} onSave={(obj)=>{setData([...[obj],...data])}} />
        <Col>
          <Form>
            <FormGroup>
              <Input
                style={{borderColor:'#000',borderWidth:1,borderRadius:5,padding:10}}
                id="text"
                name="text"
                placeholder="Procurar"
                plaintext
                value={query}
                onChange={(e)=>runQuery(e.target.value)}
              />
            </FormGroup>
          </Form>
        </Col>
        <Col md={2}>
          <Button color="primary" style={{padding:10}} onClick={()=>toggle()}>Adicionar</Button>
        </Col>
      </Row>
      <Results data={data} onDelete={(item)=>setData(data.filter(d=>d.id!==item.id))}/>
    </Container>
  )
}

export default Search
