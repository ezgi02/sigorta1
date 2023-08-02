import React from 'react'
import {Link,NavLink} from 'react-router-dom'
import { CardText, Card,CardTitle ,CardImg,CardImgOverlay,
    CardGroup,CardBody,CardSubtitle,Button
} from 'reactstrap';
function Hakkımızda() {
  return (
    <div>
        <div>
  <Card inverse>
    <CardImg
      alt="Card image cap"
      src="https://fiat.ankaraoto.com.tr/storage/images/sigorta.jpg"
      style={{
        height: 400
      }}
      width="100%"
    />
    <CardImgOverlay>
      <CardTitle tag="h5">
        SEVDİKLERİNİ VE YARININI BUGÜNDEN DÜŞÜNENLERE
      </CardTitle>
      <CardText>
      Kasko, Trafik, Konut ve Diğer Pek Çok Üründe Hemen Ücretsiz Teklif Al
      </CardText>
      <CardText>
        <small className="text-muted">
          Last updated 3 mins ago
        </small>
      </CardText>
    </CardImgOverlay>
  </Card>
</div>
<div className='container mt-3'>
<CardGroup>
  <Card>
    <CardImg
      alt="Card image cap"
      src="https://i2.milimaj.com/i/milliyet/75/869x477/601f3fbdadcdeb0d6894c397.jpg"
      top
      width="80%"
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
      <Link className='nav-link' to='/trafik'>
            Trafik Sigortasi Hesapla
        </Link>
      </Button>
    </CardBody>
  </Card>
  <Card>
    <CardImg
      alt="Card image cap"
      src="https://picsum.photos/318/180"
      top
      width="80%"
    />
    <CardBody>
      <CardTitle tag="h5">
        Card title
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        Card subtitle
      </CardSubtitle>
      <CardText>
        This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.
      </CardText>
      <Button>
        Button
      </Button>
    </CardBody>
  </Card>
</CardGroup>
</div>

    </div>
  )
}

export default Hakkımızda