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
import { dataProvider } from '../dataProvider';

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
                const { data } = await dataProvider.GET('/check-ins');
                if (data) {
                    // Transform check-ins data to volunteer hours format
                    const hoursMap = new Map<string, VolunteerHours>();

                    data.forEach(checkIn => {
                        if (!checkIn.checkOutTime) return; // Skip if no checkout time

                        const userId = checkIn.user.id;
                        const checkInTime = new Date(checkIn.checkInTime);
                        const checkOutTime = new Date(checkIn.checkOutTime);
                        
                        // Only calculate if checkout time is after checkin time
                        if (checkOutTime > checkInTime) {
                            const hours = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);

                            if (!hoursMap.has(userId)) {
                                hoursMap.set(userId, {
                                    name: checkIn.user.name || 'Unknown',
                                    totalHours: 0,
                                    lastActive: checkIn.checkOutTime
                                });
                            }

                            const current = hoursMap.get(userId)!;
                            const lastActiveDate = new Date(current.lastActive);
                            
                            hoursMap.set(userId, {
                                ...current,
                                totalHours: current.totalHours + hours,
                                lastActive: checkOutTime > lastActiveDate ? checkIn.checkOutTime : current.lastActive
                            });
                        }
                    });

                    setVolunteers(Array.from(hoursMap.values()));
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