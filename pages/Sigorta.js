import React from 'react'
import {Link,useParams } from 'react-router-dom'
import { CardText, Card,CardTitle ,CardImg,
    CardGroup,CardBody,CardSubtitle,Button
} from 'reactstrap';
function Sigorta() {
    const { userId } = useParams()
  return (
    <div>
<div className='container mt-3'>
<CardGroup>
  <Card>
    <CardImg
      alt="Card image cap"
      src="https://i2.milimaj.com/i/milliyet/75/869x477/601f3fbdadcdeb0d6894c397.jpg"
      top
      width="80%"
      height={"230px"}
    />
    <CardBody>
      <CardTitle tag="h5">
        Kasko Bedeli
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        
      </CardSubtitle>
      <CardText>
      Araç kasko değeri, aracınızın tamamen hasar gördüğü durumda sigorta şirketinin ödeyeceği para miktarıdır
      </CardText>
      <Button>
      <Link className='nav-link' to='/kasko'>
            Kasko Bedeli
        </Link>
      </Button>
    </CardBody>
  </Card>
  <Card>
    <CardImg
      alt="Card image cap"
      src="https://sigortamolsun.com/uploads/ApcKZKJlwOVsLEuCP6dWt8TuUErANcpuv6Mqxx5o.png"
      top
      width="80%"
      height={"230px"}
    />
    <CardBody>
      <CardTitle tag="h5">
        Trafik Sigortasi
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        
      </CardSubtitle>
      <CardText>
      Trafik Sigortası, kaza sonucunda diğer araç veya üçüncü şahıslara verebileceğiniz zararlar için sizi teminat altına alan zorunlu bir sigortadır.
      </CardText>
      <Button>
      <Link className='nav-link' to={`/users/${userId}/sigorta/trafik`}>
            Trafik Sigortasi Hesapla
        </Link>
      </Button>
    </CardBody>
  </Card>
  <Card>
    <CardImg
      alt="Card image cap"
      src="https://www.magdeburger.com.tr/upload/cache/6755123cac40c6de9e1b2a587a73fbcef9402882.webp"
      top
      width="80%"
      height={"230px"}
    />
    <CardBody>
      <CardTitle tag="h5">
        Konut Sigortasi
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
       
      </CardSubtitle>
      <CardText>
      Temel olarak deprem, yangın, sel ve su baskını, yanardağ püskürmesi, fırtına, dolu ve kar ağırlığı gibi doğal afetler sonucu oluşacak zararlar teminat altına alınır.
      </CardText>
      <Button>
        Konut Sigortasi Hesaplama
      </Button>
    </CardBody>
  </Card>
</CardGroup>
</div>

    </div>
  )
}

export default Sigorta