type Props = { tags: [] };

export default function Tags({ tags }: Props) {
	return (
		<div className="py-6">
			<h6>Tags</h6>
			<div className="relative space-y-4 pt-4">
				{tags?.map((tag) => (
					<div key={tag.name} className="px-3 py-2 bg-white rounded-sm">
						{tag.name}
					</div>
				))}
			</div>
		</div>
	);
}
