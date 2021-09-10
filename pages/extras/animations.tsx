import type { NextPage } from "next"
import Head from "next/head"
import { Layout } from "~/layouts/Layout"
import { Fade, Slide, AttentionSeeker } from "react-awesome-reveal"

const Animations: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Page Title</title>
      </Head>
      
      <style dangerouslySetInnerHTML={{
        __html: `
        section {
          margin-bottom: 100vh;
        }
      `}}>
      </style>

      <div className="container">
        <section>
          <Fade>
            <h1>Fade effect</h1>
          </Fade>
        </section>

        <section>
          <Slide>
            <h1>Slide animation</h1>
          </Slide>
        </section>

        <section>
          <AttentionSeeker effect="pulse">
            <h1>Pulse animation</h1>
          </AttentionSeeker>
        </section>
      </div>
    </Layout>
  )
}

export default Animations
