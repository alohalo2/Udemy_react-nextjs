'use client';

// useFormStatus: 
// status(현재 작업 또는 프로세스 상태)를 pending인지 아닌지를 
// boolean 값으로 리턴해주는 hook
import { useFormStatus } from "react-dom";

export default function FormSubmit() {
    const status = useFormStatus();

    if(status.pending) {
        return <p>Creating post...</p>
    }

    return (
        <>
            <button type="reset">Reset</button>
            <button>Create Post</button>
        </>
    );
}
