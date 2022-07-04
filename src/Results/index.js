import { useEffect, useState } from "react"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap"
import { FiTrash2 } from "react-icons/fi"

const Results = (props) => {
  const data = props.data

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
        if(props.onDelete) props.onDelete(item)
        alert('Dev removido com sucesso')
      }
    }
  }

  useEffect(()=>{
    return () => {}
  },[])

  const renderItem = (item) => <div style={{marginBottom:10}} key={item.id}>
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

  return (
    <Row  style={{textAlign:'left'}}>
      <Col md={10}>
        { data.map(item=>renderItem(item)) }
      </Col>
    </Row>
  )
}

export default Results