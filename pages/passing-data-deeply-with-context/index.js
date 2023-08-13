import Image from "next/image";
import pic from "@/assets/passing_data_lifting_state.jpg"
import pic2 from "@/assets/passing_data_prop_drilling.jpg"
import pic3 from "@/assets/passing_data_context_close.jpg"
import pic4 from "@/assets/passing_data_context_far.jpg"
import { CopyBlock, atomOneDark } from "react-code-blocks";
import { createContext, useContext } from "react";
export default function PassingDataDeeplyWithContext() {
    return (

        <>
            <h1>
                Passing Data Deeply with Context
            </h1>

            <hr />

            <h4>
                The problem with passing props
            </h4>

            <Image
                src={pic}
                width='500'
                height='150'
            />

            <Image
                src={pic2}
                width='550'
                height='400'
            />

            <hr />
            <h4>Context: an alternative to passing props</h4>

            <br />
            Let’s say you want multiple headings within the same Section to always have the same size:

            Currently, you pass the level prop to each <code> Heading </code> separately:

            <br />

            <CopyBlock
                theme={atomOneDark}
                text={`             <Section>
                <Heading level={1}>Title</Heading>
                <Section>
                  <Heading level={2}>Heading</Heading>
                  <Heading level={2}>Heading</Heading>
                  <Heading level={2}>Heading</Heading>
                  <Section>
                    <Heading level={3}>Sub-heading</Heading>
                    <Heading level={3}>Sub-heading</Heading>
                    <Heading level={3}>Sub-heading</Heading>
                    <Section>
                      <Heading level={4}>Sub-sub-heading</Heading>
                      <Heading level={4}>Sub-sub-heading</Heading>
                      <Heading level={4}>Sub-sub-heading</Heading>
                    </Section>
                  </Section>
                </Section>
              </Section>
`}
                language='jsx'
            />

            <br />
            It would be nice if you could pass the level prop to the <code> Section </code> component instead and remove it from the <code> Heading </code>
            <CopyBlock
                theme={atomOneDark}
                text={`             <Section level={3}>
                <Heading>About</Heading>
                <Heading>Photos</Heading>
                <Heading>Videos</Heading>
              </Section>
`}
                language='jsx'
            />

            <Image
                src={pic3}
                width='500'
                height='150'
            />

            <Image
                src={pic4}
                width='500'
                height='400'
            />

            <h5>
                Step 1: Create the context
            </h5>

            <CopyBlock
                theme={atomOneDark}
                text={` //LevelContex.js
import { createContext } from 'react';

export const LevelContext = createContext(1)
`}
                language='jsx'
            />

            <h5>Step 2: Use the context </h5>

            <CopyBlock
                theme={atomOneDark}
                text={`               import { useContext } from 'react';
                import { LevelContext } from './LevelContext.js';
                
                export default function Heading({ children }) {
                  const level = useContext(LevelContext);
                  switch (level) {
                    case 1:
                      return <h1>{children}</h1>;
                    case 2:
                      return <h2>{children}</h2>;
                    case 3:
                      return <h3>{children}</h3>;
                    case 4:
                      return <h4>{children}</h4>;
                    case 5:
                      return <h5>{children}</h5>;
                    case 6:
                      return <h6>{children}</h6>;
                    default:
                      throw Error('Unknown level: ' + level);
                  }
                }
`}
                language='jsx'
            />

            <br />


            <h5>Step 3: Provide the context </h5>

            <CopyBlock
                theme={atomOneDark}
                text={`import { LevelContext } from './LevelContext.js';

export default function Section({ level, children }) {
  return (
    <section className="section">
      <LevelContext.Provider value={level}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
`}
                language='jsx'
            />

            <br />

            <CopyBlock
                theme={atomOneDark}
                text={`                <Section level={1}>
                <Heading>Title</Heading>
                <Section level={2}>
                  <Heading>Heading</Heading>
                  <Heading>Heading</Heading>
                  <Heading>Heading</Heading>
                  <Section level={3}>
                    <Heading>Sub-heading</Heading>
                    <Heading>Sub-heading</Heading>
                    <Heading>Sub-heading</Heading>
                    <Section level={4}>
                      <Heading>Sub-sub-heading</Heading>
                      <Heading>Sub-sub-heading</Heading>
                      <Heading>Sub-sub-heading</Heading>
                    </Section>
                  </Section>
                </Section>
              </Section>
`}
                language='jsx'
            />

            <ol class="ms-6 my-3 list-decimal">
                <li class="leading-relaxed mb-1">You pass a <code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">level</code> prop to the <code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">&lt;Section&gt;</code>.</li>
                <li class="leading-relaxed mb-1"><code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">Section</code> wraps its children into <code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">&lt;LevelContext.Provider value=level&gt;</code>.</li>
                <li class="leading-relaxed mb-1"><code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">Heading</code> asks the closest value of <code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">LevelContext</code> above with <code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">useContext(LevelContext)</code>.</li>
            </ol>

            <hr />

            <h4>Using and providing context from the same component</h4>


            <CopyBlock
                theme={atomOneDark}
                text={`               import { useContext } from 'react';
                import { LevelContext } from './LevelContext.js';
                
                export default function Section({ children }) {
                  const level = useContext(LevelContext);
                  return (
                    <section className="section">
                      <LevelContext.Provider value={level + 1}>
                        {children}
                      </LevelContext.Provider>
                    </section>
                  );
                }
`}
                language='jsx'
            />

            Now both Heading and Section read the LevelContext to figure out how “deep” they are. And the Section wraps its children into the LevelContext to specify that anything inside of it is at a “deeper” level.

            <CopyBlock
                theme={atomOneDark}
                text={`             <Section>
                <Heading>Title</Heading>
                <Section>
                  <Heading>Heading</Heading>
                  <Heading>Heading</Heading>
                  <Heading>Heading</Heading>
                  <Section>
                    <Heading>Sub-heading</Heading>
                    <Heading>Sub-heading</Heading>
                    <Heading>Sub-heading</Heading>
                    <Section>
                      <Heading>Sub-sub-heading</Heading>
                      <Heading>Sub-sub-heading</Heading>
                      <Heading>Sub-sub-heading</Heading>
                    </Section>
                  </Section>
                </Section>
              </Section>
`}
                language='jsx'
            />

            <hr />
            <h4>Context passes through intermediate components </h4>


            <Section>
                <Heading>My Profile</Heading>
                <Post
                    title="Hello traveller!"
                    body="Read about my adventures."
                />
                <AllPosts />
            </Section>

            <CopyBlock
                theme={atomOneDark}
                text={`             export default function ProfilePage() {
                    return (
                      <Section>
                        <Heading>My Profile</Heading>
                        <Post
                          title="Hello traveller!"
                          body="Read about my adventures."
                        />
                        <AllPosts />
                      </Section>
                    );
                  }
                  
                  function AllPosts() {
                    return (
                      <Section>
                        <Heading>Posts</Heading>
                        <RecentPosts />
                      </Section>
                    );
                  }
                  
                  function RecentPosts() {
                    return (
                      <Section>
                        <Heading>Recent Posts</Heading>
                        <Post
                          title="Flavors of Lisbon"
                          body="...those pastéis de nata!"
                        />
                        <Post
                          title="Buenos Aires in the rhythm of tango"
                          body="I loved it!"
                        />
                      </Section>
                    );
                  }
                  
                  function Post({ title, body }) {
                    return (
                      <Section isFancy={true}>
                        <Heading>
                          {title}
                        </Heading>
                        <p><i>{body}</i></p>
                      </Section>
                    );
                  }
`}
                language='jsx'
            />

            <hr />
            <h4>Before you use context </h4>

            <ol class="ms-6 my-3 list-decimal">
                <li class="leading-relaxed mb-1"><strong class="font-bold">Start by <a class="inline text-link dark:text-link-dark border-b border-link border-opacity-0 hover:border-opacity-100 duration-100 ease-in transition leading-normal" href="/learn/passing-props-to-a-component">passing props.</a></strong> If your components are not trivial, it’s not unusual to pass a dozen props down through a dozen components. It may feel like a slog, but it makes it very clear which components use which data! The person maintaining your code will be glad you’ve made the data flow explicit with props.</li>
                <li class="leading-relaxed mb-1"><strong class="font-bold">Extract components and <a class="inline text-link dark:text-link-dark border-b border-link border-opacity-0 hover:border-opacity-100 duration-100 ease-in transition leading-normal" href="/learn/passing-props-to-a-component#passing-jsx-as-children">pass JSX as <code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">children</code></a> to them.</strong> If you pass some data through many layers of intermediate components that don’t use that data (and only pass it further down), this often means that you forgot to extract some components along the way. For example, maybe you pass data props like <code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">posts</code> to visual components that don’t use them directly, like <code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">&lt;Layout posts=posts /&gt;</code>. Instead, make <code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">Layout</code> take <code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">children</code> as a prop, and render <code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">&lt;Layout&gt;&lt;Posts posts=posts /&gt;&lt;/Layout&gt;</code>. This reduces the number of layers between the component specifying the data and the one that needs it.</li>
            </ol>

            <hr />
            <h4>Use cases for context </h4>

            <ul class="ms-6 my-3 list-disc">
                <li class="leading-relaxed mb-1"><strong class="font-bold">Theming:</strong> If your app lets the user change its appearance (e.g. dark mode), you can put a context provider at the top of your app, and use that context in components that need to adjust their visual look.</li>
                <li class="leading-relaxed mb-1"><strong class="font-bold">Current account:</strong> Many components might need to know the currently logged in user. Putting it in context makes it convenient to read it anywhere in the tree. Some apps also let you operate multiple accounts at the same time (e.g. to leave a comment as a different user). In those cases, it can be convenient to wrap a part of the UI into a nested provider with a different current account value.</li>
                <li class="leading-relaxed mb-1"><strong class="font-bold">Routing:</strong> Most routing solutions use context internally to hold the current route. This is how every link “knows” whether it’s active or not. If you build your own router, you might want to do it too.</li>
                <li class="leading-relaxed mb-1"><strong class="font-bold">Managing state:</strong> As your app grows, you might end up with a lot of state closer to the top of your app. Many distant components below may want to change it. It is common to <a class="inline text-link dark:text-link-dark border-b border-link border-opacity-0 hover:border-opacity-100 duration-100 ease-in transition leading-normal" href="/learn/scaling-up-with-reducer-and-context">use a reducer together with context</a> to manage complex state and pass it down to distant components without too much hassle.</li>
            </ul>

            <hr />
            <h4>Recap</h4>

            <ul class="ms-6 my-3 list-disc">
                <li class="leading-relaxed mb-1">Context lets a component provide some information to the entire tree below it.</li>
                <li class="leading-relaxed mb-1">To pass context:
                    <ol class="ms-6 my-3 list-decimal">
                        <li class="leading-relaxed mb-1">Create and export it with <code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">export const MyContext = createContext(defaultValue)</code>.</li>
                        <li class="leading-relaxed mb-1">Pass it to the <code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">useContext(MyContext)</code> Hook to read it in any child component, no matter how deep.</li>
                        <li class="leading-relaxed mb-1">Wrap children into <code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">&lt;MyContext.Provider value=...&gt;</code> to provide it from a parent.</li>
                    </ol>
                </li>
                <li class="leading-relaxed mb-1">Context passes through any components in the middle.</li>
                <li class="leading-relaxed mb-1">Context lets you write components that “adapt to their surroundings”.</li>
                <li class="leading-relaxed mb-1">Before you use context, try passing props or passing JSX as <code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">children</code>.</li>
            </ul>
        </>
    )
}

export const LevelContext = createContext(0);

export function Heading({ children }) {
    const level = useContext(LevelContext);
    switch (level) {
        case 0:
            throw Error('Heading must be inside a Section!');
        case 1:
            return <h1>{children} level = {level}</h1>;
        case 2:
            return <h2>{children} level = {level}</h2>;
        case 3:
            return <h3>{children} level = {level}</h3>;
        case 4:
            return <h4>{children} level = {level}</h4>;
        case 5:
            return <h5>{children} level = {level}</h5>;
        case 6:
            return <h6>{children} level = {level}</h6>;
        default:
            throw Error('Unknown level: ' + level);
    }
}

export function Section({ children, isFancy }) {
    const level = useContext(LevelContext);
    return (
        <section className={
            'section ' +
            (isFancy ? 'fancy' : '')
        }>
            <LevelContext.Provider value={level + 1}>
                {children}
            </LevelContext.Provider>
        </section>
    );
}

function AllPosts() {
    return (
        <Section>
            <Heading>Posts</Heading>
            <RecentPosts />
        </Section>
    );
}

function RecentPosts() {
    return (
        <Section>
            <Heading>Recent Posts</Heading>
            <Post
                title="Flavors of Lisbon"
                body="...those pastéis de nata!"
            />
            <Post
                title="Buenos Aires in the rhythm of tango"
                body="I loved it!"
            />
        </Section>
    );
}

function Post({ title, body }) {
    return (
        <Section isFancy={true}>
            <Heading>
                {title}
            </Heading>
            <p><i>{body}</i></p>
        </Section>
    );
}