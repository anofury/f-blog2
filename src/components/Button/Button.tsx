import React, { useState } from 'react'
import './Button.less'

interface Props {
    initCount: number
}

export default function Button(props: Props) {
    const [count, setCount] = useState(props.initCount || 0)
    const onTapBtn = () => {
        setCount(count + 1)
    }

    return (
        <div className='btn'>
            <button onClick={onTapBtn}>你点击了 {count} 次</button>
        </div>
    )
}