import React, { Component } from 'react';
import { Link } from 'react-router-dom';
var Rating = require('react-rating');

class RestaurantCard extends Component {
	render() {
    console.log('this', this);
    // const restaurant = this.props.location.state.restaurant

    const restaurant = this.props.restaurant
    const { venue } = restaurant;
    const img = `${venue.photos.groups[0].items[0].prefix}800x300${venue.photos.groups[0].items[0].suffix}`
    console.log('img', img);

		if (!restaurant) {
			return <div>Sorry, but the restaurant was not found</div>;
		}
		return (
			<div className="ui container ">
				<div className="ui fluid card"  >
					<div  className="image" >
						{
              venue.photos && <img
								id="restimg"
                src={img}
                // src="http://wikitravel.org/upload/shared//1/1e/Hong_Kong_Culinary_Banner.jpg"
                alt="bill"
              />
            }
					</div>
					<div className="content">
						<a className="header">
              <Link to={
                {
                  pathname: `/restaurants/${venue.name}`,
                  state: {restaurant}
                }
                }>
                <h1>{venue.name}</h1>
              </Link>
							{/* <h1>{venue.name}</h1> */}
						</a>
						<div className="meta">
							<Rating
								placeholderRate={5}
								full={<img src="https://thumb.ibb.co/fgib4F/star_full.png" className="icon" alt="" />}
								placeholder={
									<img src="https://thumb.ibb.co/fgib4F/star_full.png" className="icon" alt="" />
								}
								empty={<img src="https://thumb.ibb.co/ijDnBv/star_empty.png" className="icon" alt="" />}
							/>
							<span className="date">342 Ratings</span>
						</div>
						<div className="description">
							We serve an obsene amount of Ramen, at any point and any time. We serve asian inspired Ramen
							made with Indian Ingredients. It is the most special thing you will ever have the pleasure
							of eating....
						</div>
					</div>
					<div className="extra content">
						<a>
							<i className="map outline icon" />
							{venue.location.formattedAddress.join(', ')}
						</a>
					</div>
				</div>
				<div className="ui star rating" data-rating="3" />
			</div>
		);
	}
}

export default RestaurantCard;