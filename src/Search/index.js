import {useState} from 'react'
import { Input, Form, FormGroup, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap"

const AddModal = (props) => {
  const [name,setName] = useState('')
  const [experience,setExperience] = useState('')
  const [tags,setTags] = useState('')

  const cleanup = async() => {
    setName('')
    setExperience('')
    setTags('')
  }

  const isValid = () => name && name.length && experience && experience.length

  const save = async () => {
    props.toggle()

    try{
      if(!isValid()) {
        alert('Campos obrigatórios: Nome e Experiência.')
      }

      const data = {name:name,experience:experience,tags:tags}

      const response = await fetch('http://localhost:5000/add',{ 
        body: data,
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      })
      
      if(response.code===200){
        props.onSave(data)
        alert('Dev adicionado com sucesso')
      }
    }catch(e){
      alert(`Erro ao adicionar dev: ${e}`)
    }

  }

  const onChangeTags = (e) => {
    const value = e.target.value.toLowerCase()

    if(!value.length) setTags(value)

    if(!value.match(/^[a-z,]+$/)){
      return
    }
    const splitted = value.split(',')
    if(splitted.length<4){
      if(splitted===4) {
        setTags(splitted.filter(d=>!!d.length).join(','))
        return
      } 
      setTags(value)
    }
  }

  return (
    <Modal toggle={()=>{cleanup();props.toggle()}} isOpen={props.isOpen}>
      <ModalHeader toggle={()=>props.toggle()}>
        Novo dev
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="name">
              Nome do programador
            </Label>
            <Input
              style={{borderColor:'#000',borderWidth:1,borderRadius:5,padding:10}}
              id="name"
              name="text"
              placeholder="Nome completo"
              plaintext
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <span style={{fontSize:12}}>* obrigatório</span>
          </FormGroup>
          <FormGroup>
            <Label for="experience">
              Experiência
            </Label>
            <Input
              style={{borderColor:'#000',borderWidth:1,borderRadius:5,padding:10}}
              id="experience"
              name="text"
              type="textarea"
              placeholder='Descreva a experiência profissional'
              value={experience}
              onChange={(e)=>setExperience(e.target.value)}
            />
            <span style={{fontSize:12}}>* obrigatório</span>
          </FormGroup>
          <FormGroup>
            <Label for="experience">
              Tags
            </Label>
            <Input
              style={{borderColor:'#000',borderWidth:1,borderRadius:5,padding:10}}
              id="text"
              name="text"
              placeholder="Adicione até 3 tags"
              value={tags.replace(/\s+/g,' ').replace(/\,+/g,',')}
              onChange={(e)=>onChangeTags(e)}
              plaintext
            />
            <span style={{fontSize:12}}>Separe as tags com vírgula (,)</span>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={()=>props.toggle()}>
          Cancelar
        </Button>
        {' '}
        {
          isValid() && 
          <Button color="primary" onClick={()=>save}>
            Salvar
          </Button>
        }
      </ModalFooter>
    </Modal>
  )
}

const Search = () => {
  const [showModal,setShowModal] = useState(false)

  const toggle = async () => setShowModal(!showModal)

  return (
    <Row>
      <AddModal isOpen={showModal} toggle={toggle} />
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
        <Button color="primary" style={{padding:10}} onClick={()=>toggle()}>Adicionar</Button>
      </Col>
    </Row>
  )
}

export default Search