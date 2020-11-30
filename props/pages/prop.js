import React from 'react';

const Prop =  (props) => { 
    const {id} = props;
    return (
        <p>{`myProps : ${id === undefined ? "NONE" : id}`}</p>
    )
};
// HOOK
Prop.getInitialProps = (context) => context.query;
export default Prop;
