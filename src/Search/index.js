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

/*
import {useEffect, useState} from 'react'
import { Container, Input, Form, FormGroup, Row, Col, Button, Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap"
import { FiTrash2 } from "react-icons/fi"
import AddModal from "../AddModal"
import Algolia from '../Algolia'

const Search = () => {
  const [showModal,setShowModal] = useState(false)
  const [data,setData] = useState([])
  const [query,setQuery] = useState('')

  const toggle = async () => setShowModal(!showModal)

  const initAsync = async () => {
    const results = await Algolia.search('')
    setData([...results])
  }

  const runQuery = async (q) => {
    setQuery(q)
    const results = await Algolia.search(q)
    setData([...results])
  }

  useEffect(()=>{
    initAsync()
    return () => {}
  },[])

  const deleteItem = async (item) => {
    if(window.confirm("Remover esse dev ?")){
      const response = await fetch(`http://localhost:5000/dev/${item.id}`,{ 
        method: 'DELETE',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      })
      if(response.status===200){
        setData(data.filter(d=>d.id!==item.id))
        alert('Dev removido com sucesso')
      }
    }
  }

  const getResults = () => {
    return (
      <Row  style={{textAlign:'left'}}>
        <Col md={10}>
          { data.map(item=>renderItem(item)) }
        </Col>
      </Row>
    )
  }

  const renderItem = (item) => {
    return <div style={{marginBottom:10}} key={item.id}>
      <Card>
        <CardBody>
          <Row>
            <Col md={11}>
              <CardTitle tag="h5" style={{fontWeight:'bold'}}>
                {item.name}
              </CardTitle>
            </Col>
            <Col md={1} onClick={(e)=>{deleteItem(item);e.preventDefault();e.stopPropagation();}}>
              <FiTrash2 style={{fontSize:16}} />
            </Col>
          </Row>
          {
            item.hashtags.length>0 &&
            <CardSubtitle className="mb-2 text-muted" tag="h6" style={{fontWeight:'normal'}}>
              {item.hashtags.map(tag=>`#${tag} `)}
            </CardSubtitle>
          }
          <CardText>
            {item.experience}
          </CardText>
        </CardBody>
      </Card>
    </div>

  }

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
      {getResults()}
    </Container>
  )
}

export default Search
*/