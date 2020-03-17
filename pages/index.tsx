import { Layout } from '@Components/Layout'

export default () => {
  return (
    <Layout>
      <div className="page">
        <h1>Home Design Solutions: Admin Portal</h1>
        <main>
          <p>TODO: a lot of work...</p>
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}
