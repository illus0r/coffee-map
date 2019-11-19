import React from 'react';
import classNames from 'classnames';

const FilterEcoFriendly = ({isChecked, onToggle}) => (
	<div
		className={classNames(
			'filterEcoFriendly',
			{'__checked': isChecked}
		)}
		onClick={onToggle}
	>
		{'Эко 🌱'}
	</div>
);

export default FilterEcoFriendly;
