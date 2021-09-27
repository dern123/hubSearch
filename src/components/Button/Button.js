import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {
    const {type, title, className, onClick} = props;
    return (
        <button type={type} className={className} onClick={onClick} >{title}</button>
    )
}

Button.propTypes = {

}

export default Button
