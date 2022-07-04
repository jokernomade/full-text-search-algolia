import {useState} from 'react'
import { Input, Form, FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap"

const AddModal = (props) => {
  const [name,setName] = useState('')
  const [experience,setExperience] = useState('')
  const [hashtags,setHashtags] = useState([])
  const [saving,setSaving] = useState(false)

  const cleanup = async() => {
    setName('')
    setExperience('')
    setHashtags([])
    setSaving(false)
  }

  const isValid = () => name && name.length && experience && experience.length

  const save = async () => {
    try{
      if(!isValid()) {
        alert('Campos obrigatórios: Nome e Experiência.')
      }

      const data = {name:name,experience:experience,hashtags:hashtags}

      const response = await fetch('http://localhost:5000/dev',{ 
        method: 'POST',
        body: JSON.stringify({data:data}),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      
      if(response.status===200){
        if(props.onSave) props.onSave(data)
        alert('Dev adicionado com sucesso')
      }

      cleanup()
      props.toggle()
    }catch(e){
      alert(`Erro ao adicionar dev: ${e}`)
      setSaving(false)
    }
  }

  const onChangeTags = (e) => {
    const value = e.target.value.toLowerCase()

    if(!value.length) setHashtags([])

    if(!value.match(/^[a-z,]+$/) || hashtags.length>3 || value.split(',').length===4){
      return
    }
    
    setHashtags(value.split(','))
  }

  return (
    <Modal toggle={()=>{cleanup();props.toggle()}} isOpen={props.isOpen}>
      <ModalHeader toggle={()=>{cleanup();props.toggle()}}>
        Novo dev
      </ModalHeader>
      <ModalBody>
        {
          saving ? 
          <span>Salvando...</span>
          :
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
                value={hashtags.join(',')}
                onChange={(e)=>onChangeTags(e)}
                plaintext
              />
              <span style={{fontSize:12}}>Separe as tags com vírgula (,)</span>
            </FormGroup>
          </Form>
        }
      </ModalBody>
      <ModalFooter>
        {
          !saving &&
          <div>
            <Button onClick={()=>props.toggle()}>
              Cancelar
            </Button>
            {' '}
            {
              isValid() && 
              <Button color="primary" onClick={()=>{setSaving(true);save()}}>
                Salvar
              </Button>
            }
          </div>
        }

      </ModalFooter>
    </Modal>
  )
}

export default AddModal