import Code from "@/components/code";
import FunHighlight from "@/components/decorations/FunHighlight";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";

export default function Section8() {

    return (
        <PostSection id="testing">
            <AnchorHeading headingLevel={2} id="testing-heading">Testing</AnchorHeading>
            <p>
                A design system component is only as good as its guarantees. Our test suite verifies behavior across sync and async handlers, accessibility attributes, and real DOM interaction.
            </p>
            <AnchorHeading headingLevel={3} id="testing-setup">Set up</AnchorHeading>
            <AnchorHeading headingLevel={3} id="testing-component">The Component</AnchorHeading>
            <p>
                The Button tests confirm rendering, event handling, and accessible state management:
            </p>
            <Code lang="ts" codeString={`test('prevents click handler when disabled', () => {
  const handleClick = jest.fn()
  render(<Button disabled onClick={handleClick}>Click</Button>)
  fireEvent.click(screen.getByTestId('base-button'))
  expect(handleClick).not.toHaveBeenCalled()
})`} />

            <List>
                <li>Confirms <Code inline codeString="aria-disabled" /> and <Code inline codeString="data-loading" /> work as expected</li>
                <li>Ensures buttons never trigger parent handlers when inactive</li>
                <li>Prevents accidental form submissions with <Code inline codeString="type='button'" /></li>
            </List>

            <AnchorHeading headingLevel={3} id="testing-hook">The Hook</AnchorHeading>
            <p>
                The <Code inline codeString="useButton" /> tests go deeper — they validate that both synchronous and asynchronous click handlers log and rethrow errors correctly.
            </p>

            <Code lang="ts" codeString={`test('attaches logging to unhandled async errors', async () => {
  const error = new Error('Async Error')
  const mockHandler = jest.fn().mockRejectedValue(error)
  const clickHandler = handleClick(mockHandler)
  clickHandler({} as ReactMouseEvent<HTMLButtonElement>)
  await new Promise(r => setTimeout(r, 0))
  expect(mockLog).toHaveBeenCalledWith('Unhandled async error', error, 'error', expect.anything())
})`} />
            <p>
                This pattern ensures <FunHighlight>no button interaction fails silently</FunHighlight>,
                which makes debugging production and development environments far safer.
            </p>
        </PostSection>

    )
}