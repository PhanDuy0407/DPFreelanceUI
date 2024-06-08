import { useState } from 'react';

const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);
    const [children, setChildren] = useState(null)

    function toggle(children) {
        console.log(isShowing)
        setChildren(children)
        setIsShowing(!isShowing);
    }

    return {
        isShowing,
        toggle,
        children,
    }
};

export default useModal;