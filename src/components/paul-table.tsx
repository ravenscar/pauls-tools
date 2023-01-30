import React from 'react';
import styled from '@emotion/styled';
import {v4} from 'uuid';

const Data = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
`;

const Table = styled.table`
	max-height: 37rem;
	max-width: 1300px;
	border: 1px solid ${props => props.theme.colors.tableBorder};
	border-collapse: collapse;
`;

const Th = styled.th`
	border: 1px solid ${props => props.theme.colors.tableBorder};
	border-collapse: collapse;
	text-align: start;
	padding: 8px;
`;

const Tr = styled.tr<{rowId: number}>`
	background-color: ${props =>
		props.rowId % 2 === 0
			? props.theme.colors.tableOddRowBackground
			: props.theme.colors.background};
	border: 1px solid ${props => props.theme.colors.tableBorder};
	border-collapse: collapse;
`;

const Td = styled.td`
	word-break: break-all;
	border: 1px solid ${props => props.theme.colors.tableBorder};
	border-collapse: collapse;
	padding: 8px;
`;

type TableRow = any[];

export const PaulTable = (props: {
	data: TableRow[];
	headers?: TableRow;
	tableKey?: string;
}) => {
	const tableKey = props.tableKey ?? v4();
	const tableRows = props.data.map((row, i) => (
		<Tr key={i} rowId={i}>
			{row.map((thing, j) => (
				<Td key={`${tableKey}#${i}#${j}`}>{thing}</Td>
			))}
		</Tr>
	));
	return (
		<>
			<Data>
				<div>
					<Table>
						{props.headers && (
							<thead>
								<tr>
									{props.headers.map((thing, i) => (
										<Th key={`${tableKey}#th${i}`}>{thing}</Th>
									))}
								</tr>
							</thead>
						)}
						<tbody>{tableRows}</tbody>
					</Table>
				</div>
			</Data>
		</>
	);
};
