import Box from "@mui/material/Box";
import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = ["p", "b", "strong", "i", "em", "ul", "ol", "li", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "code", "br", "hr"];
const ALLOWED_ATTR = ["href", "target", "rel"];

/**
 * This component sanitizes HTML so its safe to use. If 'content' is not HTML,
 * it's simply rendered as-is string.
 * @param content
 * @returns sanitized and formatted HTML
 * @example
 * <p>Hello, world!</p> --> "Hello, world!"
 */
export const VenueDesc = ({ content }: { content: string }) => {
  const sanitizedContent = DOMPurify.sanitize(content, { ALLOWED_TAGS, ALLOWED_ATTR});

  return (
    <Box
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  )
}
