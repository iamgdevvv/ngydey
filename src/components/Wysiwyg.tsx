/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { _TransformValues } from 'node_modules/@mantine/form/lib/types';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { EditorEvents, useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder';
import { removeEmtpyElements } from '@/helper/react-utils';
import '@mantine/tiptap/styles.css';

type THead = 'style' | 'heading' | 'format' | 'link' | 'align' | 'all' | 'none';

type Props = {
	form: UseFormReturnType<any, _TransformValues<any>>;
	name: string;
	disabled?: boolean;
	heading?: THead[];
	placeholder?: string;
	defaultValue?: string;
	onChange?: (props: EditorEvents['update']) => void;
};

export default function Wysiwyg({
	form,
	name,
	disabled = false,
	heading = ['all'],
	placeholder,
	defaultValue,
	onChange,
}: Props) {
	const isNoneHead = useMemo(() => heading.includes('none'), [heading]);
	const isAllHead = useMemo(() => heading.includes('all'), [heading]);
	const isStyleHead = useMemo(() => heading.includes('style'), [heading]);
	const isHeadingHead = useMemo(() => heading.includes('heading'), [heading]);
	const isFormatHead = useMemo(() => heading.includes('format'), [heading]);
	const isLinkHead = useMemo(() => heading.includes('link'), [heading]);
	const isAlignHead = useMemo(() => heading.includes('align'), [heading]);

	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link,
			Superscript,
			SubScript,
			Highlight,
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
			Placeholder.configure({ placeholder }),
		],
		onUpdate(props) {
			const content = props.editor.getHTML();
			form.setFieldValue(name, removeEmtpyElements(content));

			if (typeof onChange === 'function') {
				onChange(props);
			}
		},
		editable: !disabled,
		content: defaultValue,
	});

	return (
		<RichTextEditor editor={editor}>
			{!isNoneHead ? (
				<RichTextEditor.Toolbar
					sticky
					stickyOffset={60}
				>
					{isAllHead || isStyleHead ? (
						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Bold />
							<RichTextEditor.Italic />
							<RichTextEditor.Underline />
							<RichTextEditor.Strikethrough />
							<RichTextEditor.Highlight />
							<RichTextEditor.CodeBlock />
							<RichTextEditor.ClearFormatting />
						</RichTextEditor.ControlsGroup>
					) : null}

					{isAllHead || isHeadingHead ? (
						<RichTextEditor.ControlsGroup>
							<RichTextEditor.H1 />
							<RichTextEditor.H2 />
							<RichTextEditor.H3 />
							<RichTextEditor.H4 />
							<RichTextEditor.H5 />
							<RichTextEditor.H6 />
						</RichTextEditor.ControlsGroup>
					) : null}

					{isAllHead || isFormatHead ? (
						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Blockquote />
							<RichTextEditor.Hr />
							<RichTextEditor.BulletList />
							<RichTextEditor.OrderedList />
							<RichTextEditor.Subscript />
							<RichTextEditor.Superscript />
						</RichTextEditor.ControlsGroup>
					) : null}

					{isAllHead || isLinkHead ? (
						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Link />
							<RichTextEditor.Unlink />
						</RichTextEditor.ControlsGroup>
					) : null}

					{isAllHead || isAlignHead ? (
						<RichTextEditor.ControlsGroup>
							<RichTextEditor.AlignLeft />
							<RichTextEditor.AlignCenter />
							<RichTextEditor.AlignJustify />
							<RichTextEditor.AlignRight />
						</RichTextEditor.ControlsGroup>
					) : null}
				</RichTextEditor.Toolbar>
			) : null}

			<RichTextEditor.Content />
		</RichTextEditor>
	);
}
