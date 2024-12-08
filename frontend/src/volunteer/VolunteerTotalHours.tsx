import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import createClient from 'openapi-fetch';
import type { paths } from '../openapi/types';

interface VolunteerHours {
    name: string;
    totalHours: number;
    lastActive: string;
}

const VolunteerTotalHours: React.FC = () => {
    const [volunteers, setVolunteers] = useState<VolunteerHours[]>([]);

    useEffect(() => {
        const fetchVolunteerHours = async () => {
            try {
                const client = createClient<paths>({
                    baseUrl: import.meta.env.VITE_API_URL,
                });
                const { data, error } = await client.GET('/volunteer/total-hours');
                if (error) {
                    throw error;
                }
                if (data) {
                    setVolunteers(data);
                }
            } catch (error) {
                console.error('Error fetching volunteer hours:', error);
            }
        };

        fetchVolunteerHours();
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                志工服務總時數
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>志工姓名</TableCell>
                            <TableCell align="right">總服務時數</TableCell>
                            <TableCell align="right">最後服務日期</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {volunteers.map((volunteer) => (
                            <TableRow key={volunteer.name}>
                                <TableCell component="th" scope="row">
                                    {volunteer.name}
                                </TableCell>
                                <TableCell align="right">
                                    {volunteer.totalHours.toFixed(1)}
                                </TableCell>
                                <TableCell align="right">
                                    {new Date(volunteer.lastActive).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default VolunteerTotalHours; 