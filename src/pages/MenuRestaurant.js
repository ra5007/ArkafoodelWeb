import React from 'react'
import {connect} from 'react-redux'
import {getDetailRestaurants} from '../redux/action/restaurant'
import {APP_URL} from '../resources/config'
import {Link} from 'react-router-dom'
import NumberFormat from 'react-number-format'
import StartRatings from 'react-star-ratings'

import {Row, Col, Container, Button, Card, CardHeader, CardDeck} from 'reactstrap'

class MenuRestaurant extends React.Component{
constructor(props){
    super(props)
    this.state = {

    }
}


  async componentDidMount(){
      console.log(this.props)
      const {id} = this.props.match.params
      this.props.dispatch(getDetailRestaurants(id))
}

    render(){

        return(
            <Container>
                <Row>
                {!this.props.restaurants.isLoading && this.props.restaurants.data.map(v=>(
                    <CardDeck style={{justifyContent:"center"}}>
                    <Col md key= {v.id_item} className='mt-3' xs="6" sm="4" >
                    <Card className='shadow' style = {{backgroundColor: 'dark', height:"385px", width:"255px", borderRadius:'15px', marginBottom:'20px'}}>
                        <div className='text-center'>
                            <img src= {APP_URL.concat(`src/images/${v.image}`)} alt={v.name} style={{height:"200px", width:"254px", borderRadius:'14px'}}/>   
                        </div>
                        <CardHeader>
                        <div className='text-center mt-2' >
                            <b><i>{v.item_name}</i></b>
                        </div> 
                        </CardHeader>

                        <div className='text-center mt-2' style={{color:'#FA591D'}}>
                            <b>
                            <NumberFormat value={v.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value=> <div>{value}</div>} />
                            <StartRatings rating = {v.rating} starRatedColor="orange" numberOfStars={5} starDimension = "15px" starSpacing = "1px"/>
                            </b>
                        </div>
                        {/* <div className='text-center' >
                            <i>{ v.description}</i>
                        </div> */}
                    <Container className='mt-3'>
                        <Link to={`/item/${v.id_item}`} style = {{fontSize:'12'}}>
                    <Button outline className="fa fa-info-circle text-success" color="success" style = {{float:'left'}}>
                    </Button>
                        </Link>
                    <Button onClick = {this.onSubmit} type='submit' color="success" style = {{float:'right', fontSize:'12'}} className="fa fa-cart-plus text-white">
                    </Button>                        
                    </Container>
                    </Card> 
                </Col>
                </CardDeck>
                ))}
            </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
      restaurants: state.restaurants
    }
  }
  
  export default connect(mapStateToProps)(MenuRestaurant)