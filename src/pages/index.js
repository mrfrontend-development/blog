import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'

import 'prism-theme-night-owl'

import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/command-line/prism-command-line.css'

import '../styles/prisms-custom.css'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          const tags = node.frontmatter.tags
          const categories = Array.isArray(node.frontmatter.categories)
            ? node.frontmatter.categories[0]
            : node.frontmatter.categories
          console.log('tags: ', tags)
          return (
            <div
              key={node.fields.slug}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gridColumnGap: '1rem',
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                  marginBottom: rhythm(1 / 4),
                  gridColumn: '1/5',
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              {categories && (
                <p
                  style={{
                    gridColumn: '5',
                    textAlign: 'right',
                  }}
                >
                  <strong>{categories}</strong>
                </p>
              )}
              <small
                style={{
                  gridColumn: '5',
                  textAlign: 'right',
                }}
              >
                {node.frontmatter.date}
              </small>

              <p
                style={{
                  gridColumn: '1/5',
                }}
                dangerouslySetInnerHTML={{ __html: node.excerpt }}
              />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            categories
          }
        }
      }
    }
  }
`
