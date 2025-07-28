import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Card, // We will style these cards differently to remove the "box" feel
  CardContent,
  Typography,
  MenuItem,
  Box,
  Stepper,
  Step,
  StepLabel,
  Container,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import { Quiz, Description, FormatListNumbered, Group, DeleteOutline, Dashboard as DashboardIcon } from '@mui/icons-material';
import './createQuiz.css';
import dashboardService from '../../service/dashboardService';

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [duration, setDuration] = useState('');
  const [emails, setEmails] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctOptionIndex: 0 },
  ]);

  const [activeStep, setActiveStep] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'info',
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar({ ...openSnackbar, open: false });
  };

  const showSnackbar = (message: string, severity: SnackbarState['severity']) => {
    setOpenSnackbar({ open: true, message, severity });
  };

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const updated = [...questions];
    if (field === 'question') updated[index].question = value;
    else if (field === 'correctOptionIndex') updated[index].correctOptionIndex = parseInt(value);
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex: number, optIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctOptionIndex: 0 }]);
    showSnackbar('New question added!', 'info');
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      const updated = questions.filter((_, i) => i !== index);
      setQuestions(updated);
      showSnackbar('Question removed.', 'success');
    } else {
      showSnackbar('You must have at least one question.', 'error');
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDashboardNavigate = () => {
    navigate('/dashboard');
  };

  const handleSubmit = () => {
    const payload = {
      title,
      description,
      duration: parseInt(duration, 10),
      deadLine: new Date(deadline).toISOString(),
      questions: questions.map(q => ({
        question: q.question,
        options: q.options.filter(option => option.trim() !== ''),
        correctOptionIndex: q.correctOptionIndex,
      })),
      participantEmails: emails.split(',').map(email => email.trim()).filter(Boolean),
    };
    console.log('Submitting payload:', payload);
    showSnackbar('Quiz created successfully!', 'success');
    dashboardService.createQuizRoom(payload);
    navigate('/dashboard');
  };

  const steps = [
    { label: 'Quiz Details', icon: <Quiz /> },
    { label: 'Set Questions', icon: <FormatListNumbered /> },
    { label: 'Participants & Review', icon: <Group /> },
  ];

  return (
    <Container maxWidth="xl" className="create-quiz-container"> {/* Changed to maxWidth="xl" for more space */}
      {/* Removed main-quiz-card wrapper */}
      <Box className="main-quiz-content-area"> {/* New wrapper for content */}
        <Typography variant="h3" component="h1" gutterBottom className="page-title"> {/* Larger title */}
          Create a New Quiz
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel className="quiz-stepper">
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel StepIconComponent={() => step.icon}>
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4, mb: 2 }}>
          {/* Conditional Rendering for Step Content */}
          {activeStep === 0 && (
            <Box className="form-section-content"> {/* Use Box for themed sections */}
              <Typography variant="h5" gutterBottom className="card-section-title">
                Basic Information
              </Typography>
              <TextField
                label="Quiz Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                helperText="Give your quiz a clear and concise title."
              />
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
                margin="normal"
                variant="outlined"
                helperText="Provide a brief description of the quiz content."
              />
              <TextField
                label="Deadline"
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                margin="normal"
                variant="outlined"
                helperText="When participants must complete the quiz by."
              />
              <TextField
                label="Duration (minutes)"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                helperText="Expected time for participants to finish the quiz (e.g., 30)."
              />
            </Box>
          )}

          {activeStep === 1 && (
            <Box className="form-section-content questions-section"> {/* Use Box for themed sections */}
              {questions.map((q, qIndex) => (
                <Box className="question-item-content" key={qIndex}> {/* Use Box for individual question styling */}
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" className="question-number">
                      Question {qIndex + 1}
                    </Typography>
                    {questions.length > 1 && (
                      <Tooltip title="Remove Question">
                        <IconButton onClick={() => removeQuestion(qIndex)} color="error" size="small">
                          <DeleteOutline />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                  <TextField
                    value={q.question}
                    onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                    fullWidth
                    margin="normal"
                    placeholder="Enter the question text"
                    variant="outlined"
                    className="question-input"
                  />
                  <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                    Options (provide at least 2):
                  </Typography>
                  {q.options.map((opt, optIndex) => (
                    <TextField
                      key={optIndex}
                      label={`Option ${optIndex + 1}`}
                      value={opt}
                      onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                      fullWidth
                      margin="dense"
                      variant="outlined"
                    />
                  ))}
                  <TextField
                    select
                    label="Correct Option"
                    value={q.correctOptionIndex}
                    onChange={(e) => handleQuestionChange(qIndex, 'correctOptionIndex', e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText="Select the correct answer for this question."
                  >
                    {q.options.map((option, i) => (
                      <MenuItem key={i} value={i}>{`Option ${i + 1}: ${option || '(Empty)'}`}</MenuItem>
                    ))}
                  </TextField>
                </Box>
              ))}
              <Button
                  variant="contained"
                  startIcon={<Quiz />}
                  onClick={addQuestion}
                  sx={{ mt: 2 }} // Added margin top for spacing
                  className="add-question-button"
              >
                  Add New Question
              </Button>
            </Box>
          )}

          {activeStep === 2 && (
            <Box className="form-section-content"> {/* Use Box for themed sections */}
              <Typography variant="h5" gutterBottom className="card-section-title">
                Participants & Review
              </Typography>
              <TextField
                label="Participant Emails (comma separated)"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                fullWidth
                multiline
                rows={6}
                margin="normal"
                variant="outlined"
                helperText="Enter emails of participants, separated by commas. E.g., email1@example.com, email2@example.com"
              />
              <Box className="review-summary">
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Quiz Summary
                </Typography>
                <Typography variant="body1">
                  <strong>Title:</strong> {title || 'Not set'}
                </Typography>
                <Typography variant="body1">
                  <strong>Description:</strong> {description || 'Not set'}
                </Typography>
                <Typography variant="body1">
                  <strong>Deadline:</strong> {deadline ? new Date(deadline).toLocaleString() : 'Not set'}
                </Typography>
                <Typography variant="body1">
                  <strong>Duration:</strong> {duration ? `${duration} minutes` : 'Not set'}
                </Typography>
                <Typography variant="body1">
                  <strong>Number of Questions:</strong> {questions.length}
                </Typography>
                <Typography variant="body1">
                  <strong>Participants:</strong> {emails ? emails.split(',').filter(Boolean).length : 0}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4, justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<DashboardIcon />}
            onClick={handleDashboardNavigate}
            className="stepper-button dashboard-button"
          >
            Dashboard
          </Button>
          <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                className="stepper-button"
              >
                Back
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  className="stepper-button submit-button"
                >
                  Create Quiz
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  className="stepper-button"
                >
                  Next
                </Button>
              )}
          </Box>
        </Box>
      </Box> {/* End main-quiz-content-area */}

      {/* Snackbar Component */}
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={openSnackbar.severity} sx={{ width: '100%' }}>
          {openSnackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateQuiz;