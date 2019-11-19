import React, {Component} from 'react';
import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';

class FilterAverageCheck extends Component {
	state = { ref: null };

	changeSliderByRef = (values) => {
		const { ref } = this.state;
		if (ref && ref.noUiSlider) {
			ref.noUiSlider.set(values);
		}
	};

	render () {
		const {
			onAverageCheckBoundsChange,
			averageCheckBounds,
			minValue = 0,
			maxValue = 4000
		} = this.props;
		const [from, to] = averageCheckBounds;
		return (
			<div className="filterAverageCheck">
				<div className="filterAverageCheck__slider">
					<Nouislider
						id="filterAverageCheck"
						instanceRef={(instance) => {
							if (instance && !this.state.ref) {
								this.setState({ ref: instance });
							}
						}}
						start={[0, 127]}
						connect
						range={{
							min: [minValue, minValue],
							max: [maxValue, maxValue]
						}}
						onUpdate={onAverageCheckBoundsChange}
					/>
				</div>
				<div>
					{'Средний чек от '}
					<input
						type="number"
						value={from}
						onChange={(e) => {
						   const values = [e.target.value, to];
						   if (values[0] !== undefined) {
						       onAverageCheckBoundsChange(values);
						       this.changeSliderByRef(values);
						   }
						}}
					/>
					{' до '}
					<input
						type="number"
						value={to}
						onChange={(e) => {
							const values = [from, e.target.value];
							if (values[1] !== undefined) {
								onAverageCheckBoundsChange(values);
								this.changeSliderByRef(values);
							}
						}}
					/>
					{'₽'}
				</div>
			</div>
		)
	}
}

export default FilterAverageCheck;
