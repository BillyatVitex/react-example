import { useState } from "react";
import { CopyBlock, atomOneDark } from "react-code-blocks";

export default function SharingStateBetweenComponent() {

    const [activeIndex, setActiveIndex] = useState(0);

    return (

        <>
            <h1>Sharing State Between Components</h1>

            <hr></hr>

            <h4>Almaty, Kazakhstan</h4>
            <Panel title="About">
                With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
            </Panel>
            <Panel title="Etymology">
                The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
            </Panel>

            <hr></hr>
            <h3>Step 1: Remove state from the child components </h3>

            <CopyBlock
                theme={atomOneDark}
                language='jsx'
                text={`function Panel({ title, children }) {
    const [isActive, setIsActive] = useState(false);
    return (
        <section className="panel">
            <h3>{title}</h3>
            {isActive ? (
                <p>{children}</p>
            ) : (
                <button onClick={() => setIsActive(true)}>
                    Show
                </button>
            )}
        </section>
    );
}
`} />

            <br></br>

            <hr></hr>
            <h3>Step 2: Pass hardcoded data from the common parent</h3>

            <CopyBlock
                theme={atomOneDark}
                language='jsx'
                text={`function Panel({ title, children, isActive }) {
`} />

            <br></br>

            <CopyBlock
                theme={atomOneDark}
                language='jsx'
                text={`// In parent component
const [activeIndex, setActiveIndex] = useState(0);

`} />
            <hr></hr>
            <h3>Step 3: Add state to the common parent</h3>

            <CopyBlock
                theme={atomOneDark}
                language='jsx'
                text={`// In parent component
<Panel
    isActive={activeIndex === 0}
    onShow={() => setActiveIndex(0)}
>
...
</Panel>
<Panel
    isActive={activeIndex === 1}
    onShow={() => setActiveIndex(1)}
>
    ...
</Panel>
`} />

            <h2>Almaty, Kazakhstan</h2>
            <Panel2
                title="About"
                isActive={activeIndex === 0}
                onShow={() => setActiveIndex(0)}
            >
                With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
            </Panel2>
            <Panel2
                title="Etymology"
                isActive={activeIndex === 1}
                onShow={() => setActiveIndex(1)}
            >
                The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
            </Panel2>

        </>
    )
}

function Panel({ title, children }) {
    const [isActive, setIsActive] = useState(false);
    return (
        <section className="panel">
            <h3>{title}</h3>
            {isActive ? (
                <p>{children}</p>
            ) : (
                <button onClick={() => setIsActive(true)}>
                    Show
                </button>
            )}
        </section>
    );
}

function Panel2({
    title,
    children,
    isActive,
    onShow
}) {
    return (
        <section className="panel">
            <h3>{title}</h3>
            {isActive ? (
                <p>{children}</p>
            ) : (
                <button onClick={onShow}>
                    Show
                </button>
            )}
        </section>
    );
}