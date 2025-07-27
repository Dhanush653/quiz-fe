import { Snackbar, Alert, AlertColor } from '@mui/material';

export interface loginPageProps {
    email: string;
    password: string;
}

export interface registrationProps{
    email: string;
    password: string;
    confirmPassword?: string;
    isAdmin: boolean;
}

export interface adminDashboardData {
    noOfRooms: number;
    noOfActiveRooms: number;
    noOfInactiveRooms: number;
    adminScreenDTOS: Array<{
        id: number;
        title: string;
        description: string;
        duration: string;
        deadLine: string;
        numberOfQuestions: number;
        active: boolean;
    }>;
}

export interface snackbar{
    snackbarOpen: boolean;
    snackBarMessage: string;
    snackbarType: AlertColor; // 'success' | 'error' | 'info' | 'warning'
}
