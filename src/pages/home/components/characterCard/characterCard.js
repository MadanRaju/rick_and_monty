import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import _ from 'lodash';

import './characterCard.scss';

class CharacterCard extends React.PureComponent {
    static propTypes = {
        data: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            cardData: props.data,
        };
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({ cardData: nextProps.data });
        const { cardData } = this.state;
        if (!_.isEqual(cardData, nextProps.data)) {
            this.setState({ cardData: nextProps.data });
        }
    }

    render() {
        const { cardData } = this.state;
        return (
            <div className="cardContainer" key={cardData.id}>
                <div className="title">
                    <img src={cardData.image} alt="icon" />
                    <div className="nameContainer">
                        <div className="name">{cardData.name}</div>
                        <div className="basicInfoContainer">
                            <div className="id">
                                ID:
                                {cardData.id}
                            </div>
                            <div className="created">
                                - created&nbsp;
                                {Moment(cardData.created).fromNow()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="characterInfoContainer">
                    <div className="characterInfo">
                        <div className="heading">STATUS</div>
                        <div className="value">{cardData.status}</div>
                    </div>
                    <div className="characterInfo">
                        <div className="heading">SPECIES</div>
                        <div className="value">{cardData.species}</div>
                    </div>
                    <div className="characterInfo">
                        <div className="heading">GENDER</div>
                        <div className="value">{cardData.gender}</div>
                    </div>
                    <div className="characterInfo">
                        <div className="heading">ORIGIN</div>
                        <div className="value">{cardData.origin.name}</div>
                    </div>
                    <div className="characterInfo">
                        <div className="heading">LAST LOCATION</div>
                        <div className="value">{cardData.location.name}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CharacterCard;
