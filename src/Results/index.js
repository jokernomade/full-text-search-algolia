import {useEffect, useState} from 'react'
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap"

const Results = (props) => {
  const [data,setData] = useState(props.data || [])

  useEffect(()=>{
    return () => {}
  },[])

  const renderItem = (item) => <div>
    <Card>
      <CardBody>
        <CardTitle tag="h5">
          {item.name}
        </CardTitle>
        {
          item.hashtags.length &&
          <CardSubtitle className="mb-2 text-muted" tag="h6">
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
    <Row>
      <Col md={10}>
        { data.map(item=>renderItem(item)) }
      </Col>
    </Row>
  )
}

export default Results