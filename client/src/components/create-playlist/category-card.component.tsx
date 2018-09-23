import * as React from "react";
import { Card, CardBody, CardImg, CardText } from "reactstrap";
import * as images from '../../assets/category-images';
import { Category } from "../../models/Category";

interface IProps {
  imagePath: any;
  category: Category;
}
export const CategoryCardComponent: React.StatelessComponent<IProps> = (props) => {
  return (
    <Card>
      <CardImg id="cardImage" className="card-img-top" src={images.assetsObject[props.imagePath]} alt="Card image cap" />
      <CardBody className="cardBody">
        <CardText id="cardText" className="card-text">{props.category.categoryName}</CardText>
      </CardBody>
    </Card>
  );
}