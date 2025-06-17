import { useFormik } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';

const TodoForm = ({ initialValues, onSubmit, buttonText = 'Save' }) => {
  // Format the date for datetime-local input
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, "yyyy-MM-dd'T'HH:mm");
  };

  const formik = useFormik({
    initialValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      deadline: initialValues?.deadline ? formatDateForInput(initialValues.deadline) : '',
      priority: initialValues?.priority || 'medium',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Title is required')
        .max(100, 'Title must be 100 characters or less'),
      description: Yup.string()
        .max(500, 'Description must be 500 characters or less'),
      deadline: Yup.string(),
      priority: Yup.string()
        .oneOf(['low', 'medium', 'high'], 'Invalid priority level')
    }),
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title*
        </label>
        <input
          id="title"
          name="title"
          type="text"
          {...formik.getFieldProps('title')}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            formik.touched.title && formik.errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {formik.touched.title && formik.errors.title && (
          <div className="text-red-600 text-sm mt-1">{formik.errors.title}</div>
        )}
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="4"
          {...formik.getFieldProps('description')}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            formik.touched.description && formik.errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {formik.touched.description && formik.errors.description && (
          <div className="text-red-600 text-sm mt-1">{formik.errors.description}</div>
        )}
      </div>
      
      <div>
        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
          Deadline
        </label>
        <input
          id="deadline"
          name="deadline"
          type="datetime-local"
          {...formik.getFieldProps('deadline')}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      
      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>
        <select
          id="priority"
          name="priority"
          {...formik.getFieldProps('priority')}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-200 disabled:opacity-50"
      >
        {formik.isSubmitting ? 'Saving...' : buttonText}
      </button>
    </form>
  );
};

export default TodoForm;