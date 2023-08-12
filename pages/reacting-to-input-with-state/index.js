import { useState } from 'react';
import Form from '@/app/molecules/Form';
import { CopyBlock, atomOneDark, dracula } from 'react-code-blocks';

export default function ReactingToInputWithState() {
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('typing');

    if (status === 'success') {
        return <h1>That's right!</h1>
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('submitting');
        try {
            await submitForm(answer);
            setStatus('success');
        } catch (err) {
            setStatus('typing');
            setError(err);
        }
    }

    function handleTextareaChange(e) {
        setAnswer(e.target.value);
    }

    let statuses = [
        'empty',
        'typing',
        'submitting',
        'success',
        'error',
    ];

    return (
        <>
            <h2>City quiz</h2>
            <p>
                In which city is there a billboard that turns air into drinkable water? (lima)
            </p>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={answer}
                    onChange={handleTextareaChange}
                    disabled={status === 'submitting'}
                />
                <br />
                <button disabled={
                    answer.length === 0 ||
                    status === 'submitting'
                }>
                    Submit
                </button>
                {error !== null &&
                    <p className="Error">
                        {error.message}
                    </p>
                }
            </form>

            {/* End demonstration */}

            <br></br>

            <h1>Step 1: Identify your component’s different visual states </h1>

            {statuses.map(status => (
                <section key={status}>
                    <hr></hr>
                    <h4>Form ({status}):</h4>
                    <Form status={status} />
                </section>
            ))}

            <h1>
                Step 2: Determine what triggers those state changes
            </h1>

            <hr></hr>

            <h1>
                Step 3: Represent the state in memory with useState
            </h1>

            <CopyBlock
                theme={atomOneDark}
                text={`
const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
const [isEmpty, setIsEmpty] = useState(true);
const [isTyping, setIsTyping] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [isError, setIsError] = useState(false);
`}
                language='javascript'
            />

            <hr></hr>

            <h1>
                Step 4: Remove any non-essential state variables
            </h1>

            <h4>
                Does this state cause a paradox?
            </h4>
            isTyping and isSubmitting
            <br></br>
            <h4>
                Is the same information available in another state variable already?
            </h4>
            isEmpty and isTyping <br></br>
            <s>isEmpty</s> answer.length === 0
            <h4>
                Can you get the same information from the inverse of another state variable?
            </h4>

            <s>isError</s> error !== null

            <CopyBlock
                theme={atomOneDark}
                text={`
const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
const [status, setStatus] = useState('typing'); // 'typing', 'submitting', or 'success'
`}
                language='javascript'
            />




            <hr></hr>

            <h1>
                Step 5: Connect the event handlers to set state
            </h1>
        </>
    );
}

function submitForm(answer) {
    // Pretend it's hitting the network.
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let shouldError = answer.toLowerCase() !== 'lima'
            if (shouldError) {
                reject(new Error('Good guess but a wrong answer. Try again!'));
            } else {
                resolve();
            }
        }, 1500);
    });
}
