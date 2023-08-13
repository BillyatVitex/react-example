import { useState } from "react";
import { atomOneDark, CopyBlock } from "react-code-blocks";

export default function PreservingAndResettingState() {

    const counter = <Counter />;
    const [isFancy, setIsFancy] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isPlayerA, setIsPlayerA] = useState(true);

    const contacts = [
        { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
        { id: 1, name: 'Alice', email: 'alice@mail.com' },
        { id: 2, name: 'Bob', email: 'bob@mail.com' }
    ];

    const [to, setTo] = useState(contacts[0]);

    return (

        <>
            <h1>Preserving and Resetting State</h1>

            <hr />

            <h4>The UI tree </h4>
            React uses tree structures to manage and model the UI you make. React makes UI trees from your JSX. Then React DOM updates the browser DOM elements to match that UI tree. (React Native translates these trees into elements specific to mobile platforms.)

            <Counter />
            <hr />

            <h4>State is tied to a position in the tree </h4>
            Here, there is only one  JSX tag, but it’s rendered at two different positions:

            <CopyBlock
                theme={atomOneDark}
                language='jsx'
                text={`export default function App() {
    const counter = <Counter />;
    return (
    <div>
        {counter}
        {counter}
    </div>
    );
}
`} />

            <div>
                {counter}
                {counter}
            </div>

            These are two separate counters because each is rendered at its own position in the tree.
            <hr />

            <h4>Same component at the same position preserves state</h4>

            <CopyBlock
                theme={atomOneDark}
                language='jsx'
                text={`{isFancy ? (
<Counter isFancy={true} /> 
) : (
<Counter isFancy={false} /> 
)}
`} />
            <div>
                {isFancy ? (
                    <Counter2 isFancy={true} />
                ) : (
                    <Counter2 isFancy={false} />
                )}
                <label>
                    <input
                        type="checkbox"
                        checked={isFancy}
                        onChange={e => {
                            setIsFancy(e.target.checked)
                        }}
                    />
                    Use fancy styling
                </label>
            </div >

            <hr />

            <h4>Different components at the same position reset state</h4>

            <CopyBlock
                theme={atomOneDark}
                language='jsx'
                text={`{isPaused ? (
    <p>See you later!</p>
) : (
    <Counter />
)}
`} />
            <div>
                {isPaused ? (
                    <p>See you later!</p>
                ) : (
                    <Counter />
                )}
                <label>
                    <input
                        type="checkbox"
                        checked={isPaused}
                        onChange={e => {
                            setIsPaused(e.target.checked)
                        }}
                    />
                    Take a break
                </label>
            </div>
            <b>When you render a different component in the same position, it resets the state of its entire subtree</b>
            <CopyBlock
                theme={atomOneDark}
                language='jsx'
                text={`{isFancy ? (
<div> // different tag div
    <Counter isFancy={true} /> 
</div>
) : (
<section> // section
    <Counter isFancy={false} />
</section>
)}
`} />

            {isFancy ? (
                <div>
                    <Counter isFancy={true} />
                </div>
            ) : (
                <section>
                    <Counter isFancy={false} />
                </section>
            )}

            <label>
                <input
                    type="checkbox"
                    checked={isFancy}
                    onChange={e => {
                        setIsFancy(e.target.checked)
                    }}
                />
                Use fancy styling
            </label>

            <hr />

            <h4>Resetting state at the same position</h4>
            <hr />

            <h5>Option 1: Rendering a component in different positions</h5>

            <CopyBlock
                theme={atomOneDark}
                language='jsx'
                text={`<div>
    {isPlayerA &&
        <Counter person="Taylor" />
    }
    {!isPlayerA &&
        <Counter person="Sarah" />
    }
    <button onClick={() => {
        setIsPlayerA(!isPlayerA);
    }}>
        Next player!
    </button>
</div>
`} />

            <h5>Option 2: Resetting state with a key</h5>
            <CopyBlock
                theme={atomOneDark}
                language='jsx'
                text={`<div>
    {isPlayerA ? (
        <Counter key="Taylor" person="Taylor" />
    ) : (
        <Counter key="Sarah" person="Sarah" />
    )}
    <button onClick={() => {
        setIsPlayerA(!isPlayerA);
    }}>
        Next player!
    </button>
</div>
`} />

            <div>
                {isPlayerA ? (
                    <Counter3 key="Taylor" person="Taylor" />
                ) : (
                    <Counter3 key="Sarah" person="Sarah" />
                )}
                <button onClick={() => {
                    setIsPlayerA(!isPlayerA);
                }}>
                    Next player!
                </button>
            </div>

            <h5>Resetting a form with a key</h5>

            <div>

                <CopyBlock
                    theme={atomOneDark}
                    language='jsx'
                    text={`<ContactList
    contacts={contacts}
    selectedContact={to}
    onSelect={contact => setTo(contact)}
/>
`} />
                <ContactList
                    contacts={contacts}
                    selectedContact={to}
                    onSelect={contact => setTo(contact)}
                />
                <CopyBlock
                    theme={atomOneDark}
                    language='jsx'
                    text={`<Chat contact={to} />`} />

                <Chat contact={to} />
                <CopyBlock
                    theme={atomOneDark}
                    language='jsx'
                    text={`<Chat key={to.id} contact={to} />`} />


                <Chat key={to.id} contact={to} />

            </div>

            <h2>Recap</h2>
            <ul>
                <li>
                    React keeps state for as long as the same component is rendered at the same position.
                </li>
                <li>
                    State is not kept in JSX tags. It’s associated with the tree position in which you put that JSX.
                </li>
                <li>
                    You can force a subtree to reset its state by giving it a different key.
                </li>
                <li>
                    Don’t nest component definitions, or you’ll reset state by accident.
                </li>
            </ul>

        </>
    )
}

function Counter() {
    const [score, setScore] = useState(0);
    const [hover, setHover] = useState(false);

    let className = 'counter';
    if (hover) {
        className += ' hover';
    }

    return (
        <div
            className={className}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
        >
            <h1>{score}</h1>
            <button onClick={() => setScore(score + 1)}>
                Add one
            </button>
        </div>
    );
}

function Counter2({ isFancy }) {
    const [score, setScore] = useState(0);
    const [hover, setHover] = useState(false);

    let className = 'counter';
    if (hover) {
        className += ' hover';
    }
    if (isFancy) {
        className += ' fancy';
    }

    return (
        <div
            className={className}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
        >
            <h1>{score}</h1>
            <button onClick={() => setScore(score + 1)}>
                Add one
            </button>
        </div>
    );
}


export function Chat({ contact }) {
    const [text, setText] = useState('');
    return (
        <section className="chat">
            <textarea
                value={text}
                placeholder={'Chat to ' + contact.name}
                onChange={e => setText(e.target.value)}
            />
            <br />
            <button>Send to {contact.email}</button>
        </section>
    );
}

export function ContactList({
    selectedContact,
    contacts,
    onSelect
}) {
    return (
        <section className="contact-list">
            <ul>
                {contacts.map(contact =>
                    <li key={contact.id}>
                        <button onClick={() => {
                            onSelect(contact);
                        }}>
                            {contact.name}
                        </button>
                    </li>
                )}
            </ul>
        </section>
    );
}

function Counter3({ person }) {
    const [score, setScore] = useState(0);
    const [hover, setHover] = useState(false);

    let className = 'counter';
    if (hover) {
        className += ' hover';
    }

    return (
        <div
            className={className}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
        >
            <h1>{person}'s score: {score}</h1>
            <button onClick={() => setScore(score + 1)}>
                Add one
            </button>
        </div>
    );
}