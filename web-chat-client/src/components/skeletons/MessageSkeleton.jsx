import React from "react";
import { Box, Skeleton, Stack } from "@mui/material";

const MessageSkeleton = () => {
	return (
		<>
			{/* Incoming message skeleton */}
			<Box display="flex" gap={2} alignItems="center" mb={2}>
				<Skeleton variant="circular" width={40} height={40} />
				<Stack spacing={1}>
					<Skeleton variant="text" width={160} height={16} />
					<Skeleton variant="text" width={160} height={16} />
				</Stack>
			</Box>

			{/* Outgoing message skeleton */}
			<Box display="flex" gap={2} alignItems="center" justifyContent="flex-end">
				<Stack spacing={1} alignItems="flex-end">
					<Skeleton variant="text" width={160} height={16} />
				</Stack>
				<Skeleton variant="circular" width={40} height={40} />
			</Box>
		</>
	);
};

export default MessageSkeleton;
