import React from 'react';
import classNames from 'classnames';

const FilterOpenNow = ({isChecked, onToggle}) => (
	<div
		className={classNames(
			'filterOpenNow',
			{'__checked': isChecked}
		)}
		onClick={onToggle}
	>
		{'Открыто сейчас'}
	</div>
);

export default FilterOpenNow;
