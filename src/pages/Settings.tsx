import React, { useState } from 'react';
import { Bell, Lock, Building, Palette, Mail } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    mobile: false,
  });

  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('el');

  const handleSave = () => {
    // Save settings logic
    alert('Οι ρυθμίσεις αποθηκεύτηκαν με επιτυχία!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ρυθμίσεις</h1>
        <p className="text-gray-600 mt-1">Διαχείριση ρυθμίσεων εφαρμογής</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card>
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Ειδοποιήσεις</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Ειδοποιήσεις Email</span>
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                className="toggle"
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Ειδοποιήσεις Browser</span>
              <input
                type="checkbox"
                checked={notifications.browser}
                onChange={(e) => setNotifications({ ...notifications, browser: e.target.checked })}
                className="toggle"
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Ειδοποιήσεις Mobile</span>
              <input
                type="checkbox"
                checked={notifications.mobile}
                onChange={(e) => setNotifications({ ...notifications, mobile: e.target.checked })}
                className="toggle"
              />
            </div>
          </div>
        </Card>

        {/* Organization */}
        <Card>
          <div className="flex items-center space-x-3 mb-6">
            <Building className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Στοιχεία Οργανισμού</h3>
          </div>

          <div className="space-y-4">
            <Input
              label="Όνομα Οργανισμού"
              defaultValue="Εκπαιδευτικός Οργανισμός"
            />
            <Input
              label="Διεύθυνση"
              defaultValue="Παπανδρέου 123"
            />
            <Input
              label="Τηλέφωνο"
              defaultValue="210-1234567"
            />
          </div>
        </Card>

        {/* Appearance */}
        <Card>
          <div className="flex items-center space-x-3 mb-6">
            <Palette className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Εμφάνιση</h3>
          </div>

          <div className="space-y-4">
            <Select
              label="Θέμα"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              options={[
                { value: 'light', label: 'Ανοιχτό' },
                { value: 'dark', label: 'Σκούρο' },
                { value: 'system', label: 'Σύστημα' },
              ]}
            />
            <Select
              label="Γλώσσα"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              options={[
                { value: 'el', label: 'Ελληνικά' },
                { value: 'en', label: 'English' },
              ]}
            />
          </div>
        </Card>

        {/* Email Settings */}
        <Card>
          <div className="flex items-center space-x-3 mb-6">
            <Mail className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Ρυθμίσεις Email</h3>
          </div>

          <div className="space-y-4">
            <Input
              label="Email Διαχειριστή"
              type="email"
              defaultValue="admin@example.com"
            />
            <Select
              label="Συχνότητα Αναφορών"
              defaultValue="weekly"
              options={[
                { value: 'daily', label: 'Καθημερινά' },
                { value: 'weekly', label: 'Εβδομαδιαία' },
                { value: 'monthly', label: 'Μηνιαία' },
              ]}
            />
          </div>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          Αποθήκευση Αλλαγών
        </Button>
      </div>
    </div>
  );
};

export default Settings;