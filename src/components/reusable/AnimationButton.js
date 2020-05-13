import * as React from "react";
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import './animationButton.scss';

export const AnimationButton = ({id, title, onClick}) => (
    <motion.div
        className="container"
        id={id}
        whileHover={{ scale: 1.2, rotate: 5 }}
        whileTap={{ scale: 0.9, rotate: -10, borderRadius: "100%" }}
        onClick={onClick}
    >
        <p>{title}</p>
    </motion.div>
);

AnimationButton.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

AnimationButton.defaultProps = {
    onClick: () => {},
};