import React from 'react'
import Axios from 'axios'
import {postComment} from '../redux/action/review'
import {getCart} from '../redux/action/cart'
import {connect} from 'react-redux'
import {APP_URL} from '../resources/config'
import {Container, Col, Card, Row, Button, FormGroup, CardDeck, CardImg, Label, Input, CardTitle, CardText, CardHeader} from 'reactstrap'
import {Link} from 'react-router-dom'
import Cookie from 'js-cookie'
import Jwt from 'jwt-decode'

const token = Cookie.get('token')
let decode =''
if (token) {
  decode = Jwt(token)
}


class Review extends React.Component{
    constructor(props){
        super(props)
    
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            review : '',
            rating : '',
            isFetched : false,
        }
}

    async componentDidMount(){
        const {id} = this.props.match.params
        this.props.dispatch(getCart(id))
    }

    async onSubmit(item_id){
        // event.preventDefault();
        const {id} = this.props.match.params
        const user_id = await id
        const review = await this.state.review
        const rating = await this.state.rating
        console.log(rating,review,item_id,user_id)
        await this.props.dispatch(postComment(rating,review,item_id,user_id))
        // window.location.reload()
    }


  render(){
      return(
  <Container>
      <Row>
      {!this.props.carts.isLoading && this.props.carts.data.map(v=>
        //   <CardDeck>
        <Col key={v.item_id} sm="12" md={{ size: 6, offset: 3 }} className='shadow mt-2' style = {{borderRadius:'15px', height:'540px', marginBottom:'20px'}}>
        <CardHeader className='text-center' style = {{borderTopLeftRadius:'15px', borderTopRightRadius:'15px', borderColor:'#28A745'}}>
         <b>{v.item_name}</b>
        </CardHeader>
        <CardImg top style={{borderRadius:'15px', backgroundColor:'#F8F9FA'}} width="250px" height="250px" border='dimgray' src={APP_URL.concat(`src/images/${v.image}`)} alt={v.name} />
        <Col>
        <Label for="exampleSelect">Rating</Label>
        <Input type="select" name="select" value={this.state.rating} onChange={(e)=>this.setState({rating:e.target.value})}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Input>
        <Label for="exampleText">Input Review</Label>
        <Input type="textarea" name="text"
        value={this.state.review} onChange={(e)=>this.setState({review:e.target.value})} />
        </Col>
        <Col style={{marginTop:'10px'}}>
        <Button onClick = {()=>this.onSubmit(v.item_id)} className="btn btn-success btn-block" type='submit' color = 'primary' value = 'submit'>Submit</Button>
        </Col>        
        </Col>
        //   </CardDeck>
  )}
  </Row>
      <FormGroup>
      <Button onClick = {this.onSubmit} className="btn btn-primary btn-block" type='submit' color = 'primary' value = 'submit'>Submit</Button>
      </FormGroup>
  </Container>
      )}
}

const mapStateToProps = state => {
    return {
      review: state.review,
      carts: state.carts
    }
  }
  
  export default connect(mapStateToProps)(Review)


// export default Review