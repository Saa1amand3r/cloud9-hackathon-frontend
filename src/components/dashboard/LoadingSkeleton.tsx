import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export function DashboardSkeleton() {
  return (
    <Stack spacing={6} sx={{ py: 4 }}>
      {/* Report Info Skeleton */}
      <Box>
        <Skeleton variant="text" width={200} height={40} sx={{ mb: 1 }} />
        <Skeleton variant="text" width={300} height={24} sx={{ mb: 3 }} />
        <Stack direction="row" gap={2} flexWrap="wrap">
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              variant="rounded"
              width={180}
              height={80}
              sx={{ borderRadius: 2 }}
            />
          ))}
        </Stack>
      </Box>

      {/* Overview Skeleton */}
      <Box>
        <Skeleton variant="text" width={150} height={32} sx={{ mb: 2 }} />
        <Stack spacing={1.5}>
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              variant="rounded"
              height={60}
              sx={{ borderRadius: 2 }}
            />
          ))}
        </Stack>
      </Box>

      {/* Draft Plan Skeleton */}
      <Box>
        <Skeleton variant="text" width={150} height={32} sx={{ mb: 2 }} />
        <Skeleton variant="rounded" height={120} sx={{ borderRadius: 3, mb: 2 }} />
        <Stack direction="row" gap={1} flexWrap="wrap">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton
              key={i}
              variant="rounded"
              width={100}
              height={36}
              sx={{ borderRadius: 1 }}
            />
          ))}
        </Stack>
      </Box>

      {/* Scenarios Skeleton */}
      <Box>
        <Skeleton variant="text" width={180} height={32} sx={{ mb: 2 }} />
        <Stack direction="row" gap={2} flexWrap="wrap">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              variant="rounded"
              width={240}
              height={340}
              sx={{ borderRadius: 3 }}
            />
          ))}
        </Stack>
      </Box>

      {/* Player Analysis Skeleton */}
      <Box>
        <Skeleton variant="text" width={180} height={32} sx={{ mb: 2 }} />
        <Skeleton variant="rounded" height={400} sx={{ borderRadius: 3 }} />
      </Box>
    </Stack>
  );
}
