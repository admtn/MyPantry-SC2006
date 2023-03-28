import React from "react";
import './location.scss';

class Location extends React.Component {

	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			DataisLoaded: false
		};
	}

	// ComponentDidMount is used to
	// execute the code
	componentDidMount() {
		fetch(
"https://developers.onemap.sg/commonapi/search?searchVal=revenue&returnGeom=Y&getAddrDetails=Y&pageNum=1")
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					items: json,
					DataisLoaded: true
				});
			})
	}
	
	render() {
		const { DataisLoaded, items } = this.state;
		if (!DataisLoaded) return <div className="loadpage">
			<h2> Loading... </h2> </div> ;

		return (
		<div className = "Location">
			<h2> Locations of Marts </h2>
			{
				items.results.map((item) => (
				<o1 key = {item.SEARCHVAL} > 
					Search: {item.SEARCHVAL} <br />
					Block Num: { item.BLK_NO } <br />
					Road Name: { item.ROAD_NAME } <br />
					Building: { item.BUILDING } <br />
				</o1>
				))
			}
		</div>
	);
}
}

export default Location;
